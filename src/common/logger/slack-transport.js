const Transport = require(`winston-transport`);
const { IncomingWebhook } = require(`@slack/client`);

// From https://github.com/TheAppleFreak/winston-slack-webhook-transport/blob/9ef450249a1ece413dacd228e924d37a22c3e727/app.js
module.exports = class SlackTransport extends Transport {
    // eslint-disable-next-line max-statements, complexity
    constructor(opts) {
        super(opts);

        opts = opts || {};

        this.name = opts.name || `slackWebhook`;
        // Do I really need the level parameter? Not sure.
        // this.level = opts.level || "info";
        this.formatter = opts.formatter || undefined;
        this.webhook = new IncomingWebhook(opts.webhookUrl);
        this.channel = opts.channel || ``;
        this.username = opts.username || ``;
        this.iconEmoji = opts.iconEmoji || ``;
        this.iconUrl = opts.iconUrl || ``;
        this.unfurlLinks = opts.unfurlLinks || false;
        this.markdown = opts.markdown || false;
        this.application = opts.application || undefined;
        this.logTag = opts.tag || `default`;
    }

    // eslint-disable-next-line max-lines-per-function, max-statements
    log(info, callback) {
        // Figure out which keys in info are attachments
        const attachments = [];
        const attachmentKeys = Object.keys(info).filter(key => !isNaN(parseInt(key)));
        attachmentKeys.forEach(key => attachments.push(info[key]));

        const payload = {
            channel: this.channel,
            username: this.username,
            icon_emoji: this.iconEmoji,
            icon_url: this.iconUrl,
            unfurl_links: this.unfurlLinks,
            mrkdwn: this.markdown,
        };

        // Check formatter
        if (this.formatter && typeof this.formatter === `function`) {
            const logData = this.formatter(info);
            payload.text = logData.text;
            attachments.push({
                color: `#CCCC00`,
                fields: [
                    {
                        title: `Application`,
                        value: this.application,
                        short: true,
                    },
                    {
                        title: `Tag`,
                        value: this.logTag,
                        short: true,
                    },
                    {
                        title: `Date`,
                        value: (new Date()).toString(),
                        short: true,
                    },
                ],
            });
        } else {
            payload.text = `${info.level}: ${info.message}`;
        }

        payload.attachments = attachments;

        this.webhook.send(payload, (err, header, statusCode, body) => {
            if (err) {
                console.error(`
                    ===============================================
                    CAN'T SEND AN ERROR TO SLACK. PLEASE NOTICE ME.
                    ===============================================
                `, err);
            } else {
                setImmediate(() => this.emit(`logged`, info));
            }
        });

        if (callback && typeof callback === `function`) {
            callback(null, true);
        }
    }
};
