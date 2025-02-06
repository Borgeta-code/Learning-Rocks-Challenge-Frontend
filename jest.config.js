module.exports = {
    moduleFileExtensions: ['js', 'vue'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    testMatch: ['**/*.spec.(js|jsx|ts|tsx)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    snapshotSerializers: ['jest-serializer-vue'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
}
