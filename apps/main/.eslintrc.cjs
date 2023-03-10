/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@ic/indie'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
