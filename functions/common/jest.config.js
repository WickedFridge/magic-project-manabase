module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [`**/*.js`, `!node_modules/**`, `!scripts/**`, `!config/*`],
    coverageReporters: [`text-summary`],
    reporters: [
        `default`,
        [
            `./node_modules/jest-html-reporter`,
            {
                pageTitle: `Test Report`,
                includeFailureMsg: true,
            },
        ],
        `jest-junit`,
    ],
    testMatch: [`**/tests/**/*.test.js`],
    testResultsProcessor: `jest-sonar-reporter`,
    testURL: 'http://localhost/',
};