import React from 'react';
import { Link } from 'react-router-dom';

const PopularPost = ({post}) => {
    return (
        <div className='popularPost'>
            <Link className='popularPostTitle' to={`${post._id}`}>
                {post.title}
            </Link>
        </div>
    );
}

export default PopularPost;
