/**
 * @file ESLint Configuration
 * @module eslint-config
 * @see https://eslint.org/docs/user-guide/configuring
 * @see https://github.com/prettier/eslint-config-prettier
 */

const EXTENDS_CONFIG = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended'
]

const PARSER_OPTIONS = {
  ecmaFeatures: {
    impliedStrict: true,
    jsx: true
  },
  ecmaVersion: 2020,
  requireConfigFile: false,
  sourceType: 'module'
}

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: EXTENDS_CONFIG,
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ...PARSER_OPTIONS,
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'tree-shaking'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-useless-constructor': 1,
    eqeqeq: 1,
    'no-ex-assign': 0,
    'prefer-arrow-callback': 2,
    'prettier/prettier': [
      2,
      {
        usePrettierrc: true
      }
    ],
    'sort-keys': [
      1,
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never'
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      env: {
        es6: true,
        'jest/globals': true,
        node: true
      },
      extends: EXTENDS_CONFIG.splice(1, 0, 'plugin:jest/recommended'),
      rules: {}
    },
    {
      files: ['**/*.js'],
      parser: '@babel/eslint-parser',
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0,
        'require-jsdoc': 1,
        'valid-jsdoc': 2
      }
    },
    {
      files: ['**/.eslintrc.js'],
      rules: {
        'sort-keys': 0
      }
    }
  ],
  settings: {}
}
