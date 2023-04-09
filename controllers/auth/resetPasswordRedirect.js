const { FRONT_URL } = process.env

const resetPasswordRedirect = async (req, res) => {
    const { token } = req.params

    res.redirect(`${FRONT_URL}/refresh/${token}`)
}

module.exports = resetPasswordRedirect
