/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },

  testMatch: ['**/__tests__/**/*.test.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json']
}
