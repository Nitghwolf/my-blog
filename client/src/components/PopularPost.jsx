import React from 'react';

const PopularPost = ({post}) => {
    return (
        <div className='popularPost'>
            <div className='popularPostTitle'>
                {post.title}
            </div>
        </div>
    );
}

export default PopularPost;
