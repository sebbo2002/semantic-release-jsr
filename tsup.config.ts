import { defineConfig } from 'tsup';
import fs from 'fs';

const pkg = JSON.parse(
    fs.readFileSync('./package.json', 'utf-8')
);
export default defineConfig({
    clean: true,
    external: [
        ...Object.keys(pkg.devDependencies),
        ...Object.keys(pkg.dependencies),
        'semantic-release'
    ],
    entry: [
        'src/index.ts'
    ],
    format: ['esm', 'cjs'],
    dts: true,
    shims: true,
    sourcemap: true,
    minify: true
});
