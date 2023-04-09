const { User } = require('../../models/userModel')

const getUserById = async (req, res) => {
    const { userId: _id } = req.params
    const user = await User.findOne({ _id })

    res.json({
        name: user.name,
        birthday: user.birthday,
        email: user.email,
        phone: user.phone,
        city: user.city,
        avatarURL: user.avatarURL,
        userId: user._id,
    })
}

module.exports = getUserById
