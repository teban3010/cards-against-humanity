module.exports = {
  root: true,
  extends: ['prettier', 'prettier/react', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': ['off'],
    'import/prefer-default-export': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/state-in-constructor': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/no-array-index-key': ['off'],
    'react/display-name': ['off'],
    'react/prop-types': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'no-param-reassign': ['off'],
    'no-plusplus': ['off'],
    'no-nested-ternary': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    indent: [
      'error',
      2,
      { SwitchCase: 1, MemberExpression: 1, flatTernaryExpressions: false },
    ],
  },
  plugins: [],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
