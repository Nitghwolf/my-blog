import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Momet from 'react-moment';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
    if (!post) {
        return (<div className='text-xl text-center text-white py-10'>Загрузка...</div>);
    }

    return (
        <Link to={`/${post._id}`}>
            <div className='postItem'>
                <div className={post.imgUrl ? 'postImage' : 'flex rounded-sm'}>
                    {post.imgUrl && (
                        <img src={`http://localhost:3002/${post.imgUrl}`} alt="img" className='object-cover w-full' />
                    )}
                </div>
                <div className='postInfo'>
                    <div className='username'>{post.username}</div>
                    <div className='username'><Momet date={post.createdAt} format='DD MMM YYYY' /></div>
                </div>
                <div className='postTitle'>{post.title}</div>
                <div className='postText'>{post.text}</div>

                <div className='postButtonContainer'>
                    <button className='postButton'>
                        <AiFillEye /> <span>{post.views}</span>
                    </button>
                    <button className='postButton'>
                        <AiOutlineMessage /> <span>{post.comments?.length}</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default PostItem;
