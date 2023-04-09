const addNoticeByCategory = require('./addNoticeByCategory')
const getNoticesByCategories = require('./getNoticesByCategories')
const getNoticeById = require('./getNoticeById')
const searchByKeyWord = require('./searchByKeyWord')
const deleteNoticeById = require('./deleteNoticeById')
const updateFavorite = require('./updateFavorite')
const getNoticeByFavorite = require('./getNoticeByFavorite')
const getUserNotices = require('./getUserNotices')
const updateNotice = require('./updateNotice')
const deleteFromFavorite = require('./deleteFromFavorite')

module.exports = {
    addNoticeByCategory,
    getNoticesByCategories,
    getNoticeById,
    searchByKeyWord,
    deleteNoticeById,
    updateFavorite,
    getNoticeByFavorite,
    getUserNotices,
    updateNotice,
    deleteFromFavorite,
}
