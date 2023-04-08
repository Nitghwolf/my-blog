import PostItem from '../components/PostItem';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { useState, useEffect, useCallback } from 'react';
import { AiFillDelete, AiTwotoneEdit } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { removePost } from '../store/features/post/async';


const PostPage = () => {
    const params = useParams();
    const [post, setPost] = useState(null);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removePostHendler = () => {
        try {
            dispatch(removePost(params.id));
            toast("Delete");
            navigate('/posts');
        } catch (error) {
            toast(error);
        }
    };

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
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
                    {
                        user?._id === post?.author && (
                            <div className='flexGap3-right'>
                                <button className='postButton text-lg'>
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button className='postButton text-lg' onClick={removePostHendler}>
                                    <AiFillDelete />
                                </button>
                            </div>
                        )
                    }
                </div>
                <div className='w-1/3'>COMMENTS</div>
            </div>
        </div>
    );
}

export default PostPage;