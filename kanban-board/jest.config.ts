import type { Config } from 'jest';

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/private/var/folders/cq/glxv7cr97lvfzb0573cfq0gc0000gn/T/jest_dx",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  
  
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  
  testEnvironment: 'jsdom',

  
  transformIgnorePatterns: [
    '/node_modules/(?!(next)/)',
  ],

  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  
  
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};

export default config;
