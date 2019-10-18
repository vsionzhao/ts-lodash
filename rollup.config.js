const fs = require('fs')
const path = require('path')
import resolve from 'rollup-plugin-node-resolve';
const typescript = require('rollup-plugin-typescript2')
import babel from 'rollup-plugin-babel';

const targets = fs.readdirSync('packages')

const pkg = require('./package.json')
const formats = pkg.buildOptions.formats
const packagesDir = path.resolve(__dirname, 'packages')

const packageConfigs = [];

const formatMap = {
    global: 'iife',
    cjs: 'cjs',
    esm: 'es'
}

targets.forEach(fileName => {
    const isDir = fs.statSync(`packages/${fileName}`).isDirectory()
    formats.forEach(format => {
        const options = {
            input: path.resolve(packagesDir, isDir ? `./${fileName}/index.ts` : `./${fileName}`),
            output: {
                file: path.resolve(packagesDir, isDir ? `${fileName}/dist/${fileName}.${format}.prod.js` : `dist/${fileName}.${format}.prod.js`),
                format: formatMap[format],
            }
        }
        if (format === 'cjs' || format === 'esm') {
            packageConfigs.push(createConfig(options))
        } else if (format === 'global') {
            options.name = format;
            packageConfigs.push(createMiniConfig(options))
        }
    })
});




function createConfig({ output, name, input }, plugins = []) {
    const isGlobalBuild = /\.global(\.prod)?\.js$/.test(output.file)
    if (isGlobalBuild) {
        output.name = name
    }
    const tsPlugin = typescript({
        check: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        exclude: ['test']
    });
    return {
        input,
        output,
        plugins: [
            tsPlugin,
            resolve(),
            babel({
                exclude: 'node_modules/**',
                plugins: ['external-helpers']
            }),
            ...plugins
        ]
    }
}

function createMiniConfig(output) {
    const { terser } = require('rollup-plugin-terser')
    return createConfig(output,
        [terser()]
    );
}
module.exports = packageConfigs;
