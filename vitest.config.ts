import { defineConfig } from 'vitest/config'
import * as path from "node:path";

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        alias: {
            '@application': path.resolve(__dirname, 'src/application'),
            '@domain': path.resolve(__dirname, 'src/domain'),
            '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
            '@helper': path.resolve(__dirname, 'src/helper'),
        },
        coverage: {
            provider: 'v8'
,       },
        include: ['test/**/*']
    },
})