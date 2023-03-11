/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@ic/indie'],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};
