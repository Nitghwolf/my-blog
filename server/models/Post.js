import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: false,
        },
        imgUrl: {
            type: String,
            default: '',
        },
        views: {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        username: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Post', PostSchema);