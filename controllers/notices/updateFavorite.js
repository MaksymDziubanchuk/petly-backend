const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')

const updateFavorite = async (req, res, next) => {
    const { noticeId } = req.params
    const { _id, favoriteNotices = [] } = req.user

    const index = favoriteNotices.indexOf(noticeId)
    if (index === -1) {
        favoriteNotices.push(noticeId)
        const user = await User.findByIdAndUpdate(
            _id,
            { favoriteNotices },
            { new: true }
        )

        if (user) {
            res.json({
                user: {
                    email: user.email,
                    favoriteNotices: user.favoriteNotices,
                },
            })
        } else {
            next(HttpError(404, 'User not found'))
        }
    } else {
        next(HttpError(400, 'Notice already in favorites'))
    }
}

module.exports = updateFavorite
