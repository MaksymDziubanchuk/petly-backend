const jwt = require('jsonwebtoken')
const { HttpError } = require('../../helpers')
const { SECRET_KEY, FRONT_URL } = process.env

const { User } = require('../../models/userModel')

const google = async (req, res, next) => {
    try {
        if (req.user._id) {
            const { _id: id } = req.user
            const payload = {
                id,
            }
            const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
            await User.findByIdAndUpdate(id, { token })
            res.redirect(`${FRONT_URL}/user?token=${token}`)
        }
    } catch (error) {
        next(HttpError(400))
    }
}

module.exports = google
