import fs from 'fs';
import { defineConfig } from 'tsdown';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
export default defineConfig({
    dts: true,
    entry: ['src/index.ts'],
    external: [
        ...Object.keys(pkg.devDependencies),
        ...Object.keys(pkg.dependencies),
        'semantic-release',
    ],
    format: ['esm', 'cjs'],
    minify: true,
    shims: true,
    sourcemap: true,
});
