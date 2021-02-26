const { jsWithTsESM: preset } = require('ts-jest/presets')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')
const vercel = require('./vercel.json')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

const prefix = '<rootDir>/'

module.exports = {
  ...preset,
  globals: {
    'ts-jest': {
      tsconfig: `${prefix}tsconfig.test.json`
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix }),
  prettierPath: `${prefix}node_modules/prettier`,
  setupFilesAfterEnv: [`${prefix}__tests__/setup.ts`],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '__tests__/__fixtures__/',
    '__tests__/__mocks__/',
    '__tests__/setup.ts',
    '__tests__/utils.ts',
    'dist/',
    'node_modules/',
    'public/',
    '(.*).d.ts'
  ],
  testTimeout: vercel.functions['api/index.ts'].maxDuration * 1000,
  verbose: true
}
