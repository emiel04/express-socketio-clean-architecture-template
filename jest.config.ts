import path from 'path';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    moduleNameMapper: {
        '^@application/(.*)$': path.resolve(__dirname, 'src/application/$1'),
        '^@infrastructure/(.*)$': path.resolve(__dirname, 'src/infrastructure/$1'),
    },
};