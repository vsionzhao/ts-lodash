const fs = require('fs-extra')
const execa = require('execa')
const path = require('path')
const { targets } = require('./utils')

    ; (async () => {
        for (target of targets) {
            await fs.remove(path.resolve(`packages`, `${target}/dist`));
        }
        await build();
    })()


async function build() {
    await execa('rollup', [
        '-c',
    ],
        { stdio: 'inherit' }
    )
}