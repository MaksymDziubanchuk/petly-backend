const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseError } = require('../middlewares')

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        birthday: {
            type: Date,
            default: '',
        },
        city: {
            type: String,
            required: [true, 'Region is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
        },
        avatarURL: {
            type: String,
            default: '',
        },
        public_id: {
            type: String,
            default: '',
        },
        favoriteNotices: {
            type: Array,
            dafault: [],
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
)

userSchema.post('save', handleMongooseError)

const registerSchema = Joi.object({
    password: Joi.string().min(7).max(32).required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    city: Joi.string().required(),
    phone: Joi.string().min(12).max(12).required(),
})

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
})

const updateSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    birthday: Joi.string(),
    city: Joi.string(),
    phone: Joi.string().min(12).max(12),
})

const emailSchema = Joi.object({
    email: Joi.string().email().required(),
})

const updatePasswordSchema = Joi.object({
    password: Joi.string().min(7).max(32).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSchema,
    emailSchema,
    updatePasswordSchema,
}

const User = model('user', userSchema)

module.exports = {
    User,
    schemas,
}
