const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier'],
  root: true,
  rules: {
    // TypeScript rules
    '@typescript-eslint/explicit-function-return-type': [
      ERROR,
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      ERROR,
      {
        accessibility: 'explicit',
        overrides: { constructors: 'no-public' }
      }
    ],
    '@typescript-eslint/no-unused-vars': ERROR,
    '@typescript-eslint/no-use-before-define': ERROR,
    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-shadow': ERROR,

    // standard rules
    'class-methods-use-this': OFF,
    'comma-dangle': [ERROR, 'never'],
    'newline-before-return': ERROR,
    'comma-spacing': [ERROR, { before: false, after: true }],
    'consistent-return': OFF,
    curly: ERROR,
    'eol-last': [ERROR, 'always'],
    'linebreak-style': OFF,
    'no-console': WARN,
    'no-param-reassign': ERROR,
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'no-use-before-define': OFF, // '@typescript-eslint' variant enabled above
    'no-useless-constructor': OFF, // '@typescript-eslint' variant enabled above
    'no-shadow': OFF, // '@typescript-eslint' variant enabled above
    'no-undef': ERROR,
    'no-var': ERROR,
    'no-inline-comments': ERROR,
    'prefer-const': ERROR,
    'prefer-template': ERROR,
    quotes: [ERROR, 'single', { avoidEscape: true }],
    'require-await': ERROR,
    'lines-between-class-members': [ERROR, 'always', { exceptAfterSingleLine: true }],

    // import rules
    'import/extensions': [ERROR, 'always', { js: 'never', ts: 'never' }],
    'import/no-dynamic-require': OFF,
    'import/no-import-module-exports': OFF,
    'import/no-unresolved': ERROR,
    'import/order': [
      ERROR,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: false
        },
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always'
      }
    ],
    'no-underscore-dangle': OFF,
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        devDependencies: ['**/*.test.*', '**/*.spec.*']
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      typescript: {
        project: './tsconfig.json'
      }
    }
  }
};
