const { HttpError } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const getUserNotices = async (req, res, next) => {
    const { _id: owner } = req.user
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    try {
        const unsortedNotices = await Notice.find({ owner }, '', {
            skip,
            limit,
        }).populate('owner', 'name email phone')
        const allNotice = await Notice.find({ owner })
        const countNotices = allNotice.length ?? 0
        if (!unsortedNotices) {
            next(HttpError(404))
        } else {
            const notices = [...unsortedNotices].sort(
                (firstNotice, secondNotice) =>
                    new Date(secondNotice.createdAt) -
                    new Date(firstNotice.createdAt)
            )
            res.json({ countNotices, notices })
        }
    } catch (error) {
        next(HttpError(404, error.message))
    }
}

module.exports = getUserNotices
