import Post from '../models/Post.js';
import User from '../models/User.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

// Create Post
export const createPost = async(req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if(req.file){
            const filename = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', filename));

            const newPostWithImage = new Post({
                title: title,
                text: text,
                imgUrl: filename,
                author: req.userId,
                username: user.username
            });

            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts: newPostWithImage},
            });

            return res.json(newPostWithImage);
        }

        const newPostWithoutImage = new Post({
            title: title,
            text: text,
            author: req.userId,
            imgUrl: '',
            username: user.username
        });

        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithoutImage},
        });

        return res.json(newPostWithoutImage);
    } catch (error) {
        res.json({message: 'Не удалось сохранить пост'})
    }
};
