const { Notice } = require('../../models/noticeModel')
const { HttpError } = require('../../helpers')

const searchByKeyWord = async (req, res, next) => {
    const { keyword, category = 'sell', page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    try {
        const result = await Notice.find(
            {
                title: { $regex: keyword.toLowerCase(), $options: 'i' },
                category,
            },
            '',
            {
                skip,
                limit,
            }
        ).populate('owner', 'name email phone')
        const allResults = await Notice.find({
            title: { $regex: keyword.toLowerCase(), $options: 'i' },
            category,
        })
        const countNotices = allResults.length ?? 0
        if (!result) {
            next(HttpError(404))
        } else {
            res.json({ countNotices, result })
        }
    } catch (error) {
        next(HttpError(404, error.message))
    }
}

module.exports = searchByKeyWord
