const execa = require('execa')


execa(
    'rollup',
    ['-wc',],
    {
        stdio: 'inherit'
    }
)