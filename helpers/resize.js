const Jimp = require('jimp')

async function resize(path, newPath) {
    const image = await Jimp.read(path)
    image.cover(250, 250).write(newPath)
}

module.exports = resize
