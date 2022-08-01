module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  coverageReporters: [
    'text',
    'html'
  ],
  testMatch: ['<rootDir>/tests/**/*(*.)@(spec|test).{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^src[/](.+)': '<rootDir>/src/$1',
    '^node_modules[/](.+)': '<rootDir>/node_modules/$1'
  },
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
}
