import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PostItem from '../components/PostItem';
import axios from '../utils/axios';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    const fetchUserPosts = async () => {
        try {
            const {data} = await axios.get('/posts/user/myposts');

            setPosts(data);
        } catch (error) {
            toast(error);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
           {posts?.map((post, index) => <PostItem key={index} post={post} />)}
        </div>
    );
}

export default PostsPage;