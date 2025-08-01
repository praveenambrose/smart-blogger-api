const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);
    
module.exports = Post;