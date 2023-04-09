const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        next(HttpError(401, 'Email is wrong or user doesn`t exist'))
    }

    if (!user.verify) {
        next(HttpError(401, 'Email in not verified'))
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        next(HttpError(401, 'Password is wrong'))
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

    const result = await User.findByIdAndUpdate(
        user._id,
        { token },
        { new: true }
    )

    if (!result) {
        next(HttpError(404))
    }

    res.status(201).json({
        email: user.email,
        userId: user._id,
        token,
    })
}

module.exports = login
