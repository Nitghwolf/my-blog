import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../components/PostItem';
import { getUserPosts } from '../store/features/post/async';


const PostsPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.post.userPosts);

    useEffect(() => {
        dispatch(getUserPosts());
    }, [dispatch]);

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
           {posts?.map((post, index) => <PostItem key={index} post={post} />)}
        </div>
    );
}

export default PostsPage;