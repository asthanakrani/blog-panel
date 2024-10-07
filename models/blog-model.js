const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    blog_img: {
        type: String,
        required: true
    },
});

const blogModel = mongoose.model('blog', blogSchema);
module.exports = blogModel;
