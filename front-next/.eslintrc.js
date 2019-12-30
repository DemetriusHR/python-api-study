module.exports = {
  extends: 'airbnb',
  env: { browser: true, node: true },
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks'],
  rules: {
    'linebreak-style': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
