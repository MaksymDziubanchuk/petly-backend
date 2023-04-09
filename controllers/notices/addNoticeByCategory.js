const path = require('path')
const fs = require('fs/promises')
const { HttpError, cloudinary } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const addNoticeByCategory = async (req, res, next) => {
    const { _id: owner } = req.user
    if (!req.file) {
        next(HttpError(400, 'Avatar is required'))
    }
    const { path: tempUpload, originalname } = req.file
    const FileName = `${owner}_pet_${originalname}`
    const resultUpload = path.join(avatarsDir, FileName)

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
        const result = await Notice.create({
            ...req.body,
            image: imageURL,
            public_id: publicId,
            owner,
        })
        const addedNotice = await Notice.findById(result._id).populate(
            'owner',
            'name email phone'
        )

        res.json(addedNotice)
    } catch (error) {
        if (resultUpload) {
            fs.unlink(resultUpload)
        }

        next(HttpError(403, error.message))
    }
}

module.exports = addNoticeByCategory
