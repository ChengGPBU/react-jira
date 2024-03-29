module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
    // project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/no-var-requires': 0,
    'jsx-quotes': ['error', 'prefer-single'], //jsx 单引号
    'no-debugger': 'off',
    'react/no-children-prop': 'off', //error 禁止使用 children 做 props
    '@typescript-eslint/ban-types': 'off', // 关闭禁止使用 object
    'react/display-name': 'off', // 不强制要求写displayName
  },
}
