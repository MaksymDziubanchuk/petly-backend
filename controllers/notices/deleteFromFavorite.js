const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')

const deleteFromFavorite = async (req, res, next) => {
    const { noticeId } = req.params
    const { _id, favoriteNotices = [] } = req.user

    const index = favoriteNotices.indexOf(noticeId)
    if (index === -1) {
        next(HttpError(404, 'Notice not found'))
    } else {
        favoriteNotices.splice(index, 1)
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
            next(HttpError(404, 'User not found in favorites'))
        }
    }
}

module.exports = deleteFromFavorite
