const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')
const { schemas } = require('../../models/userModel')

const updateUserData = async (req, res, next) => {
    const { _id } = req.user

    const query = req.query

    const { error } = schemas.updateSchema.validate(query)
    if (error) {
        next(HttpError(400, error.message))
    }

    const key = Object.keys(query)[0]

    const value = query[key]

    if (value === '') {
        next(HttpError(400, `${key} is required`))
    }

    const actionResult = await User.findByIdAndUpdate(req.user, req.query, {
        new: true,
    })

    if (!actionResult) {
        next(HttpError(404))
    }

    const result = await User.findOne({ _id })

    return res.json({ [key]: result[key] })
}

module.exports = updateUserData
