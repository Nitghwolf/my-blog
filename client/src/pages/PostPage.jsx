import React from 'react';
import PostItem from '../components/PostItem';
import {Link, useParams} from 'react-router-dom';
import { useCallback } from 'react';
import axios from '../utils/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState(null);

    const fetchPost = useCallback(async() => {
        const {data} = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return (
        <div>
            <Link to={'/'} className='backButton'>Назад</Link>
            <div className='flex gap-10 py-8'>
                <div className='w-2/3'>
                    <PostItem post={post} />
                </div>
                <div className='w-1/3'>COMMENTS</div>
            </div>
        </div>
    );
}

export default PostPage;