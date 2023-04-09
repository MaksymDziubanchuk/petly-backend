const cloudinary = require('cloudinary').v2

const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: 'dndoidgc0',
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
})

cloudinary.api
    .create_upload_preset({
        name: 'PetCare',
        tags: 'Dogs, cat, parrots',
        folder: 'pets',

        transformation: [
            { aspect_ratio: '4:3', crop: 'fill' },
            { width: 'auto', crop: 'scale' },
            { dpr: 'auto' },
            { fetch_format: 'auto' },
        ],
    })
    .then((uploadResult) => uploadResult)
    .catch((error) => error)

module.exports = cloudinary
