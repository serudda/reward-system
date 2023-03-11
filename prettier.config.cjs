/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve('prettier-plugin-tailwindcss'), require.resolve('prettier-plugin-prisma')],
  semi: true,
  arrowParens: 'always',
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
