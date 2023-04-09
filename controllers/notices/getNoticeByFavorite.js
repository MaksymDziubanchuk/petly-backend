const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const getNoticeByFavorite = async (req, res, next) => {
    const { favoriteNotices } = req.user
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    try {
        const unsortedNotices = await Notice.find(
            {
                _id: favoriteNotices,
            },
            '',
            {
                skip,
                limit,
            }
        ).populate('owner', 'name email phone')
        const allNotices = await Notice.find({
            _id: favoriteNotices,
        })
        const countNotices = allNotices.length ?? 0
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

module.exports = getNoticeByFavorite
