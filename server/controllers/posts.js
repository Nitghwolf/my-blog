import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
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
                $push: { posts: newPostWithImage },
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
            $push: { posts: newPostWithoutImage },
        });

        return res.json(newPostWithoutImage);
    } catch (error) {
        res.json({ message: 'Не удалось сохранить пост' })
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort('-views');

        if (!posts) {
            return res.json({ message: 'Постов нет' });
        }

        res.json({ posts, popularPosts })
    } catch (error) {
        res.json({ message: 'Не удалось получить посты' })
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });

        res.json(post)
    } catch (error) {
        res.json({ message: "Пост не найден" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const postsList = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id);
            })
        );

        res.json(postsList);
    } catch (error) {
        res.json({ message: "Посты не найдены" });
    }
};