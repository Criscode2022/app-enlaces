const newUserController = require('./newUserController');
const loginUserController = require('./loginUserController');
const followUserController = require('./followUserController');
const unfollowUserController = require('./unfollowUserController');
const checkFollowController = require('./checkFollowController');

module.exports = {
    newUserController,
    loginUserController,
    checkFollowController,
    followUserController,
    unfollowUserController,
};
