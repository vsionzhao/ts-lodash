const fs = require('fs')
const targets = fs.readdirSync('packages').filter(f => fs.statSync(`packages/${f}`).isDirectory())

module.exports = {
    targets
}