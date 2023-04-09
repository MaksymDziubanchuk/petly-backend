const { User } = require('../../models/userModel')
const { Notice } = require('../../models/noticeModel')
const { Pet } = require('../../models/petModel')
const { HttpError, cloudinary } = require('../../helpers')

const deleteCurrent = async (req, res, next) => {
    try {
        const { _id } = req.user
        const user = await User.findOne({ _id })

        const userNotises = await Notice.find({ owner: _id })
        userNotises.forEach(async (item) => {
            await cloudinary.uploader
                .destroy(item.public_id)
                .then((result) => result)
            await Notice.findByIdAndDelete(item._id)
        })

        const userPets = await Pet.find({ owner: _id })
        userPets.forEach(async (item) => {
            await cloudinary.uploader
                .destroy(item.public_id)
                .then((result) => result)
            await Pet.findByIdAndDelete(item._id)
        })
        if (user.public_id) {
            await cloudinary.uploader
                .destroy(user.public_id)
                .then((result) => result)
        }

        await User.findByIdAndDelete(_id)
        res.json({
            message: 'Successful delete',
        })
    } catch (error) {
        next(HttpError(404, error.message))
    }
}

module.exports = deleteCurrent
