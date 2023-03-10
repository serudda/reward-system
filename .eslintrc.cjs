/** @type {import("eslint").Linter.Config} */
module.exports = {
  settings: {
    extends: ['@ic/indie'],
    next: {
      rootDir: ['apps/main/*/'],
    },
  },
};
