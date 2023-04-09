const register = require('./register')
const verify = require('./verify')
const login = require('./login')
const logout = require('./logout')
const authentification = require('./authentification')
const resendVerifyEmail = require('./resendVerifyEmail')
const updateUserData = require('./updateUserData')
const updateUserAvatar = require('./updateUserAvatar')
const google = require('./google')
const facebook = require('./facebook')
const resetPassword = require('./resetPassword')
const resetPasswordRedirect = require('./resetPasswordRedirect')
const updatePassword = require('./updatePassword')

module.exports = {
    register,
    verify,
    login,
    logout,
    authentification,
    resendVerifyEmail,
    updateUserData,
    updateUserAvatar,
    google,
    facebook,
    resetPassword,
    resetPasswordRedirect,
    updatePassword,
}
