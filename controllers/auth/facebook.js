const jwt = require('jsonwebtoken')

const { SECRET_KEY, FRONT_URL } = process.env

const { User } = require('../../models/userModel')

const facebook = async (req, res) => {
    const { _id: id } = req.user
    const payload = {
        id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })
    await User.findByIdAndUpdate(id, { token })

    res.redirect(
        `${FRONT_URL}?token=${token}`
    )
}

module.exports = facebook
