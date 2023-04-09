const express = require('express')

const ctrl = require('../../controllers/pets')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const { validateBody, upload } = require('../../middlewares')

const { schemasPet } = require('../../models/petModel')

router.get(
    '/users/current/pets',
    ctrl.authentification,
    ctrlWrapper(ctrl.getUserPets)
)

router.get('/users/:userId/pets', ctrlWrapper(ctrl.getAnotherUserPets))

router.post(
    '/users/addPet',
    ctrl.authentification,
    upload.single('image'),
    validateBody(schemasPet.addPetSchema),
    ctrlWrapper(ctrl.addUserPet)
)
router.put(
    '/users/:petId',
    ctrl.authentification,
    upload.single('image'),
    validateBody(schemasPet.addPetSchema),
    ctrlWrapper(ctrl.updateUserPet)
)

router.delete(
    '/users/:petId',
    ctrl.authentification,
    ctrlWrapper(ctrl.deleteUserPet)
)

module.exports = router
