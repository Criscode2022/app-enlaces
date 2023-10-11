const newUserController = require('./newUserController');
const loginUserController = require('./loginUserController');
const followUserController = require('./followUserController');
const unfollowUserController = require('./unfollowUserController');
const checkFollowController = require('./checkFollowController');
const getFollowingUsersController = require('./getFollowingUsersController');

module.exports = {
    newUserController,
    getFollowingUsersController,
    loginUserController,
    checkFollowController,
    followUserController,
    unfollowUserController,
};
