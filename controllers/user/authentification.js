const jwt = require('jsonwebtoken')
const { User } = require('../../models/userModel')
const { HttpError } = require('../../helpers')
const { SECRET_KEY } = process.env

const authentification = async (req, res, next) => {
    const { authorization = '' } = req.headers
    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer' || !token) {
        next(HttpError(400, 'Token not found'))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id)
        if (!user || !user.token) {
            next(HttpError(401))
        }
        req.user = user
        next()
    } catch {
        next(HttpError(400, 'Token don`t match'))
    }
}

module.exports = authentification
