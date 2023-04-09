const path = require('path')
const fs = require('fs/promises')
const { HttpError, cloudinary } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateNotice = async (req, res, next) => {
    const { _id: owner } = req.user
    const { noticeId: _id } = req.params

    if (!req.file) {
        try {
            await Notice.findByIdAndUpdate(_id, {
                ...req.body,
            })
            const updatedNotice = await Notice.findById(_id).populate(
                'owner',
                'name email phone'
            )
            res.json(updatedNotice)
        } catch (error) {
            next(HttpError(403, error.message))
        }
    } else {
        const { public_id } = await Notice.findById(_id)
        const { path: tempUpload, originalname } = req.file
        const FileName = `${owner}_pet_${originalname}`
        const resultUpload = path.join(avatarsDir, FileName)

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
                fs.unlink(resultUpload)
            })
            await Notice.findByIdAndUpdate(_id, {
                ...req.body,
                image: imageURL,
                public_id: publicId,
            })

            const updatedNotice = await Notice.findById(_id).populate(
                'owner',
                'name email phone'
            )

            res.json(updatedNotice)
        } catch (error) {
            if (resultUpload) {
                fs.unlink(resultUpload)
            }

            next(HttpError(403, error.message))
        }
    }
}

module.exports = updateNotice
