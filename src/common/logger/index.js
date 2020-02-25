/* eslint-disable no-process-env, no-console */
const winston = require(`winston`);
require(`winston-daily-rotate-file`);
const util = require(`util`);

const { format, createLogger, transports } = winston;

const authorizedLogLevels = [`error`, `warn`, `info`, `verbose`, `debug`, `silly`];
let _loggerConfig = {};

function cloudwatchFormat(tag, msg) {
    return JSON.stringify({
        tag,
        ...msg,
    });
}

function initLogger(config) {
    const { name, slack, logger, aws } = config;

    _loggerConfig = {
        env: process.env.NODE_ENV,
        name,
        slack,
        logger,
        aws,
    };

    if (_loggerConfig.logger && !authorizedLogLevels.includes(_loggerConfig.logger.level)) {
        console.log(
            `WARNING: INVALID LOG LEVEL ${_loggerConfig.logger.level} IN CONFIGURATION, force to default level: 'debug'`
        );
        _loggerConfig.logger.level = `debug`;
    }

    console.log(`Starting with logger configuration`, _loggerConfig)
}

function consoleFormat(tag) {
    return format.combine(
        format.splat(),
        format.simple(),
        format.colorize(),
        format.timestamp({
            format: `DD/MM HH:mm`,
        }),
        format.printf(info => {
            if (typeof info.message === `object`) {
                info.message = util.inspect(info.message, {
                    compact: true,
                    breakLength: 80,
                    colors: true,
                    depth: null,
                });
            }
            let timestamp = ``;
            if (info.level.includes(`debug`)) {
                timestamp = `\x1b[36m[${info.timestamp}][D]\x1b[0m`;
            } else if (info.level.includes(`info`)) {
                timestamp = `\x1b[32m[${info.timestamp}][I]\x1b[0m`;
            } else if (info.level.includes(`warn`)) {
                timestamp = `\x1b[31m[${info.timestamp}][W]\x1b[0m`;
            } else if (info.level.includes(`error`)) {
                timestamp = `\x1b[31m[${info.timestamp}][E]\x1b[0m`;
            } else {
                timestamp = `[${info.timestamp}]`;
            }
            let output = `${timestamp}${tag}: ${info.message}`;
            if (info.stack) {
                output += `\n${info.stack}`;
            }
            return output;
        }),
    );
}

function logFileFormat(tag) {
    return format.combine(
        format.splat(),
        format.simple(),
        format.timestamp({
            format: `DD/MM HH:mm`,
        }),
        format.printf(info => {
            if (typeof info.message === `object`) {
                info.message = util.inspect(info.message, {
                    compact: true,
                });
            }
            let output = `[${info.timestamp}][${tag}][${info.level}]: ${info.message}`;
            if (info.stack) {
                output += `\n${info.stack}`;
            }
            return output;
        }),
    );
}

function slackFormat(projectName, info) {
    let text = `*${projectName}* \`${info.level}\``;
    text += typeof info.message === `object`
        ? ` \`\`\`${util.inspect(info.message, { depth: Infinity })}\`\`\``
        : ` ${info.message}`;
    if (info.stack) {
        text += `\n\`\`\`${info.stack}\`\`\``;
    }
    return { text };
}

/**
 * We use the default logging levels of winston:
 * error:   0
 * warn:    1
 * info:    2
 * verbose: 3
 * debug:   4
 * silly:   5
 *
 * Winston does hide error information when using logger.info(new Error()) 💩💩💩
 * Let's override logging method to automatically pass it to message.err
*/
function patchLoggerInstance(logger) {
    const methodsToWrap = authorizedLogLevels;
    methodsToWrap.forEach(method => {
        const oldMethod = logger[method];
        logger[method] = function(...args) {
            // If the message is an instance of Error, we add usefull informations to the log
            if (args[0] instanceof Error) {
                const message = {
                    message: args[0].message,
                    stack: args[0].stack,
                };
                args[0] = message;
            }

            return oldMethod.apply(this, args);
        };
    });
}

// eslint-disable-next-line max-lines-per-function, max-statements, complexity
function customLogger(tag = _loggerConfig.name) {
    const formattedTag = tag.toString().substr(0, 15);
    const colorizedFormattedTag = `\x1b[33m[${formattedTag}]\x1b[0m`;

    // When no logger specified, setup to debug, allow customLogger to work in test context
    if (!_loggerConfig.logger) {
        _loggerConfig.logger = { level: `debug` };
    }

    const loggerConfig = {
        level: _loggerConfig.logger.level,
        transports: [
            new transports.Console({
                prettyPrint: true,
                format: consoleFormat(colorizedFormattedTag),
            }),
        ],
    };
    if (process.env.NODE_ENV !== `test`) {
        const fileTransport = new transports.DailyRotateFile({
            format: logFileFormat(formattedTag),
            filename: `${process.env.LOG_PATH || `logs`}/%DATE%-combined.log`,
            datePattern: `YYYY-MM-DD`,
        });
        loggerConfig.transports.push(fileTransport);
    }
    if (_loggerConfig.slack && _loggerConfig.slack.webhook) {
        const projectName = _loggerConfig.name;
        const slackTransport = new (require(`./slack-transport`))({
            formatter: info => slackFormat(projectName, info),
            channel: _loggerConfig.slack.channel,
            webhookUrl: _loggerConfig.slack.webhook,
            level: `error`,
            markdown: true,
            unfurlLinks: true,
            application: projectName,
            tag: formattedTag,
        });
        loggerConfig.transports.push(slackTransport);
    }
    if (_loggerConfig.aws && _loggerConfig.aws.awsAccessKeyId) {
        loggerConfig.transports.push(
            new (require(`winston-cloudwatch`))({
                messageFormatter: cloudwatchFormat.bind(null, tag),
                level: `debug`,
                ..._loggerConfig.aws,
            }
        ));
    }

    const logger = createLogger(loggerConfig);
    patchLoggerInstance(logger);

    return logger;
}

module.exports = {
    initLogger,
    customLogger,
};
