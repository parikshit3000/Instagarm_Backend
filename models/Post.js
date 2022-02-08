const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true,
        max: 50
    },
    desc: {
        type:String,
        max:200
    },
    img: {
        type:String,
    },
    likes: {
        type:Array,
        default:[]
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('Post', postSchema);