const bcrypt = require('bcrypt')
const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')

const updatePassword = async (req, res, next) => {
    const { _id } = req.user
    const { password } = req.body
    try {
        if (password === '' || !password) {
            next(HttpError(400, `${password} is required`))
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const actionResult = await User.findByIdAndUpdate(req.user, {
            password: hashPassword,
        })

        if (!actionResult) {
            next(HttpError(404))
        }

        res.json({
            message: 'Password successful update',
        })
    } catch (error) {
        next(HttpError(400, error.message))
    }
}

module.exports = updatePassword
