const { Pet } = require('../../models/petModel')
const { HttpError, cloudinary } = require('../../helpers')

const deleteUserPet = async (req, res, next) => {
    const deletingImage = await Pet.findById({ _id: req.params.petId })
    const status = await Pet.findByIdAndRemove(req.params.petId)
    if (!status) {
        next(HttpError(404))
    }
    try {
        await cloudinary.uploader
            .destroy(deletingImage.public_id)
            .then((result) => result)
    } catch (error) {
        next(HttpError(404, error.message))
    }

    return res.json({ message: 'Successful delete' })
}

module.exports = deleteUserPet
