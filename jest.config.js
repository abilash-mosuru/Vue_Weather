
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // <— requires jest-environment-jsdom to be installed
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(js|ts)$': 'babel-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'ts'],
  // Optional if you use '@' alias
  // moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
};
