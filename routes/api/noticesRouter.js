const express = require('express')
const ctrl = require('../../controllers/notices')
const ctrlAuth = require('../../controllers/auth')
const { upload, validateBody } = require('../../middlewares')
const { ctrlWrapper } = require('../../helpers')
const { schemas } = require('../../models/noticeModel')

const router = express.Router()

router.get(
    '/favorite',
    ctrlAuth.authentification,
    ctrlWrapper(ctrl.getNoticeByFavorite)
)

router.get('/notice/:noticeId', ctrlWrapper(ctrl.getNoticeById))

router.get('/own', ctrlAuth.authentification, ctrlWrapper(ctrl.getUserNotices))

router.get('/search', ctrlWrapper(ctrl.searchByKeyWord))

router.get('/:categoryName', ctrlWrapper(ctrl.getNoticesByCategories))

router.post(
    '/notice',
    ctrlAuth.authentification,
    upload.single('image'),
    validateBody(schemas.addSchema),
    ctrlWrapper(ctrl.addNoticeByCategory)
)

router.put(
    '/notice/:noticeId',
    ctrlAuth.authentification,
    upload.single('image'),
    validateBody(schemas.addSchema),
    ctrlWrapper(ctrl.updateNotice)
)

router.patch(
    '/favorites/:noticeId',
    ctrlAuth.authentification,
    ctrlWrapper(ctrl.updateFavorite)
)

router.delete(
    '/favorites/:noticeId',
    ctrlAuth.authentification,
    ctrlWrapper(ctrl.deleteFromFavorite)
)

router.delete(
    '/:noticeId',
    ctrlAuth.authentification,
    ctrlWrapper(ctrl.deleteNoticeById)
)

module.exports = router
