const getPostsController = require('./getPostsController');
const likePostController = require('./likePostController');
const getAllLikesController = require('./getAllLikesController');
const unlikePostController = require('./unlikePostController');
const createPost = require('./createPostController');

module.exports = {
    createPost,
    getPostsController,
    likePostController,
    getAllLikesController,
    unlikePostController,
};
