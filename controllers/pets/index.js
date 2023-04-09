const authentification = require('./authentification')
const getUserPets = require('./getUserPets')
const addUserPet = require('./addUserPet')
const deleteUserPet = require('./deleteUserPet')
const updateUserPet = require('./updateUserPet')
const getAnotherUserPets = require('./getAnotherUserPets')

module.exports = {
    authentification,
    getUserPets,
    addUserPet,
    deleteUserPet,
    updateUserPet,
    getAnotherUserPets,
}
