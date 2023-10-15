const newUserController = require('./newUserController');
const loginUserController = require('./loginUserController');
const followUserController = require('./followUserController');
const unfollowUserController = require('./unfollowUserController');
const updateUserController = require('./updateUserController');
const checkFollowController = require('./checkFollowController');
const getFollowingUsersController = require('./getFollowingUsersController');
const getUserByIdController = require('./getUserByIdController');

module.exports = {
    newUserController,
    getFollowingUsersController,
    loginUserController,
    checkFollowController,
    followUserController,
    unfollowUserController,
    updateUserController,
    getUserByIdController
};
