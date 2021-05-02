const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
    },
    body: {
        text: {
            type: String,
            required: true
        },
        imgURLs: {
            type: [String]
        }
    },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;