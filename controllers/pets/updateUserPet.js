const path = require('path')
const fs = require('fs/promises')

const { HttpError, cloudinary } = require('../../helpers')
const { Pet } = require('../../models/petModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateUserPet = async (req, res, next) => {
    const { _id: owner } = req.user
    const { petId: _id } = req.params

    if (!req.file) {
        try {
            await Pet.findByIdAndUpdate(_id, {
                ...req.body,
            })
            const updatedPet = await Pet.findById(_id)
            res.json({
                _id: updatedPet._id,
                name: updatedPet.name,
                birthday: updatedPet.birthday,
                breed: updatedPet.breed,
                comments: updatedPet.comments,
                image: updatedPet.image,
            })
        } catch (error) {
            next(HttpError(403, error.message))
        }
    } else {
        const { public_id } = await Pet.findById(_id)
        const { path: tempUpload, originalname } = req.file
        const filename = `${owner}_ownPet_${originalname}`
        const resultUpload = path.join(avatarsDir, filename)

        await fs.rename(tempUpload, resultUpload)

        let imageURL
        let publicId

        try {
            await cloudinary.uploader
                .destroy(public_id)
                .then((result) => result)
            await cloudinary.uploader.upload(resultUpload).then((result) => {
                imageURL = result.url
                publicId = result.public_id
                if (resultUpload) {
                    fs.unlink(resultUpload)
                }
            })
            await Pet.findByIdAndUpdate(_id, {
                ...req.body,
                image: imageURL,
                public_id: publicId,
            })

            const updatedPet = await Pet.findById(_id)
            res.json({
                _id: updatedPet._id,
                name: updatedPet.name,
                birthday: updatedPet.birthday,
                breed: updatedPet.breed,
                comments: updatedPet.comments,
                image: updatedPet.image,
            })
        } catch (error) {
            if (resultUpload) {
                fs.unlink(resultUpload)
            }

            next(HttpError(403, error.message))
        }
    }
}

module.exports = updateUserPet
