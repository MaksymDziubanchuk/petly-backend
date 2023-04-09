const { HttpError } = require('../../helpers')
const { Notice } = require('../../models/noticeModel')

const getNoticesByCategories = async (req, res, next) => {
    const { categoryName } = req.params
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    try {
        const foundNotices = await Notice.find({ category: categoryName }, '', {
            skip,
            limit,
        }).populate('owner', 'name email phone')
        const allNotice = await Notice.find({ category: categoryName })
        const countNotices = allNotice.length ?? 0
        if (!foundNotices) {
            next(HttpError(404))
        } else {
            const notices = [...foundNotices].sort(
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

module.exports = getNoticesByCategories
