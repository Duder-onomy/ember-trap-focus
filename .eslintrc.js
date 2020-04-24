'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },

  plugins: [
    'ember',
    'ember-suave',
  ],

  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended',
    'plugin:ember/recommended',
  ],

  env: {
    browser: true,
  },

  rules: {
    // TODO: Remove when is https://github.com/babel/babel-eslint/issues/530 fixed
    indent: 'off',
    'brace-style': ['error', '1tbs', { allowSingleLine: true }], // Allow single-line functions
    'comma-dangle': ['error', 'always-multiline'],
    'ember/no-jquery': 'error',
  },

  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],

      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
      ],

      parserOptions: {
        sourceType: 'script',
      },

      env: {
        browser: false,
        node: true,
      },

      plugins: ['node'],

      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      }),
    },
  ],
};
