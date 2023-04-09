const express = require('express')

const ctrl = require('../../controllers/user')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

router.get('/current', ctrl.authentification, ctrlWrapper(ctrl.getCurrent))

router.get('/:userId', ctrlWrapper(ctrl.getUserById))

router.delete(
    '/current',
    ctrl.authentification,
    ctrlWrapper(ctrl.deleteCurrent)
)

module.exports = router
