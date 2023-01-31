import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).ts'],
  resetMocks: true,
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./tests/testenv.ts'],
  setupFilesAfterEnv: ['@alex_neo/jest-expect-message'],
  testTimeout: 10000,
};

export default config;
