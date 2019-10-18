const path = require('path')
const typescript = require('rollup-plugin-typescript2')

const { targets } = require('./scripts/utils')

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
    formats.forEach(format => {
        const options = {
            input: path.resolve(packagesDir, `./${fileName}/index.ts`),
            output: {
                file: path.resolve(packagesDir, `${fileName}/dist/${fileName}.${format}.prod.js`),
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
