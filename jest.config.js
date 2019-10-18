module.exports = {
    preset: 'ts-jest',
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['packages/*/src/**/*.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    rootDir: __dirname,
    testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)']
}