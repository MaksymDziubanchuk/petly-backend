const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const getNoticeById = async (req, res, next) => {
    const { noticeId } = req.params

    const notice = await Notice.findById(noticeId).populate(
        'owner',
        'name email phone'
    )
    if (!notice) {
        next(HttpError(404))
    }
    res.json(notice)
}

module.exports = getNoticeById
