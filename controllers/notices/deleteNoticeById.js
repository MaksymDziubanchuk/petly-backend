const { Notice } = require('../../models/noticeModel')
const { HttpError, cloudinary } = require('../../helpers')

const deleteNoticeById = async (req, res, next) => {
    const { noticeId } = req.params
    const { _id: owner } = req.user
    const deletingImage = await Notice.findById({ _id: noticeId, owner })
    const deletedNotice = await Notice.findOneAndDelete({
        _id: noticeId,
        owner,
    })
    if (!deletedNotice) {
        next(HttpError(404))
    }
    try {
        await cloudinary.uploader
            .destroy(deletingImage.public_id)
            .then((result) => result)
    } catch (error) {
        next(HttpError(404, error.message))
    }

    res.json({ message: 'Successful delete' })
}

module.exports = deleteNoticeById
