const express = require('express')

const ctrl = require('../../controllers/auth')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const { validateBody, upload } = require('../../middlewares')

const { schemas } = require('../../models/userModel')
const passport = require('../../services/email/passport')

router.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    ctrlWrapper(ctrl.google)
)
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email', 'profile'] })
)

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    ctrlWrapper(ctrl.facebook)
)

router.post(
    '/register',
    validateBody(schemas.registerSchema),
    ctrlWrapper(ctrl.register)
)

router.post(
    '/login',
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.login)
)

router.post(
    '/verify',
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.resendVerifyEmail)
)

router.post(
    '/reset-password',
    validateBody(schemas.emailSchema),
    ctrlWrapper(ctrl.resetPassword)
)

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify))

router.get('/reset-password/:token', ctrlWrapper(ctrl.resetPasswordRedirect))

router.patch('/update', ctrl.authentification, ctrlWrapper(ctrl.updateUserData))

router.patch(
    '/update-password',
    ctrl.authentification,
    validateBody(schemas.updatePasswordSchema),
    ctrlWrapper(ctrl.updatePassword)
)

router.patch(
    '/update/avatar',
    ctrl.authentification,
    upload.single('avatarURL'),
    ctrlWrapper(ctrl.updateUserAvatar)
)

router.post('/logout', ctrl.authentification, ctrlWrapper(ctrl.logout))

module.exports = router
