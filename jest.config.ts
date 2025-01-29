import path from 'path';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }],
    },
    moduleNameMapper: {
        '^@application/(.*)$': '<rootDir>/src/application/$1',
        '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@helper/(.*)$': '<rootDir>/src/helper/$1',
    },
};