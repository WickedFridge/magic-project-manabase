module.exports = {
    // parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        '@thetribe/eslint-config-react',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:json/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        // Global
        'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
        'import/no-cycle': 0,
        'import/no-unresolved': 0,
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            },
        ],
        'lines-between-class-members': 0,
        'no-unused-vars': ['error'],
        'no-shadow': 'off',
        'no-use-before-define': 'off',
        indent: ['error', 4],
        'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
        // React
        'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
        'react/prop-types': 0, // Unnecessary with Typescript
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
