const { User } = require('../../models/userModel')

const { FRONT_URL } = process.env

const verify = async (req, res) => {
    const { verificationToken } = req.params
    try {
        const user = await User.findOne({ verificationToken })
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null,
        })
        res.redirect(`${FRONT_URL}/login`)
    } catch (error) {
        res.redirect(`${FRONT_URL}/*`)
    }
}

module.exports = verify
