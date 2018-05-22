module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: 'airbnb-base',
  rules: {
    'arrow-body-style': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'no-trailing-spaces': 0,
    'no-unused-expressions': 0,
    'no-shadow': 0,
    'no-param-reassign': 0,
    // Never use these last 4's like this in a real application
    'no-alert': 0,
    'no-console': 0,
    'no-debugger': 0,
    'no-irregular-whitespace': 0,
  },
};
