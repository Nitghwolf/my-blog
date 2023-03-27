import React, { useEffect } from 'react';
import PopularPost from '../components/PopularPost';
import PostItem from '../components/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../store/features/post/async';

const MainPage = () => {
    const dispatch = useDispatch();
    const { posts, popularPosts } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    if (!posts.length) {
        return (<div className='text-xl text-center text-white py-10'>Постов нет</div>);
    }

    return (
        <div className='mainPage'>
            <div className='flexContainerPosts'>
                <div className='postsContainer'>
                    {posts?.map((post, index) => <PostItem key={index} post={post} />)}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>Популярное:</div>
                    {popularPosts?.map((post, index) => <PopularPost key={index} post={post} />)}
                </div>
            </div>
        </div>
    );
}

export default MainPage;