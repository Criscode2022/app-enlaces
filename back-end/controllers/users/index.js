const newUserController = require('./newUserController');
const loginUserController = require('./loginUserController');
const followUserController = require('./followUserController');
const unfollowUserController = require('./unfollowUserController');
const updateUserController = require('./updateUserController');
const checkFollowController = require('./checkFollowController');
const getFollowingUsersController = require('./getFollowingUsersController');
const getUserByIdController = require('./getUserByIdController');
const deleteUserController = require('./deleteUserController');

module.exports = {
    checkFollowController,
    deleteUserController,
    followUserController,
    getFollowingUsersController,
    getUserByIdController,
    loginUserController,
    newUserController,
    unfollowUserController,
    updateUserController,
};
