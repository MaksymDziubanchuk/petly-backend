const path = require('path')
const fs = require('fs/promises')

const { HttpError, cloudinary } = require('../../helpers')
const { Pet } = require('../../models/petModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addUserPet = async (req, res, next) => {
    const { _id: owner } = req.user
    if (!req.file) {
        return next(HttpError(400, 'Image is required'))
    }
    const { path: tempUpload, originalname } = req.file
    const filename = `${owner}_ownPet_${originalname}`
    const resultUpload = path.join(avatarsDir, filename)

    await fs.rename(tempUpload, resultUpload)

    let imageURL
    let publicId

    try {
        await cloudinary.uploader.upload(resultUpload).then((result) => {
            imageURL = result.url
            publicId = result.public_id
            if (resultUpload) {
                fs.unlink(resultUpload)
            }
        })
        const newPet = await Pet.create({
            ...req.body,
            image: imageURL,
            public_id: publicId,
            owner,
        })

        res.json({
            _id: newPet._id,
            name: newPet.name,
            birthday: newPet.birthday,
            breed: newPet.breed,
            comments: newPet.comments,
            image: newPet.image,
        })
    } catch (error) {
        if (resultUpload) {
            fs.unlink(resultUpload)
        }

        next(HttpError(403, error.message))
    }
}

module.exports = addUserPet
