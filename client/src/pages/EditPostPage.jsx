import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { useEffect } from 'react';
import { updatePost } from '../store/features/post/async';

const EditPostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [newImage, setNewImage] = useState('');

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setText(data.text);
        setTitle(data.title);
        setOldImage(data.imgUrl);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const submitHandler = () => {
        try {
            const data = new FormData();
            data.append('title', title);
            data.append('text', text);
            data.append('id', params.id);
            data.append('image', newImage);
            dispatch(updatePost(data));
            navigate('/posts');
        } catch (error) {
            toast(error);
        }
    };

    const clearHandler = () => {
        setTitle('');
        setText('');
        setNewImage('');        
    };

    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={e => e.preventDefault()}
        >
            <label className='addPost-form-label'>
                Прикрепить изображение:
                <input
                    type="file"
                    className='hidden'
                    onChange={e => {
                        setNewImage(e.target.files[0]);
                        setOldImage('');
                    }}
                />
            </label>
            <div className='flex object-cover py-2'>
                {oldImage && <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />}
                {newImage && <img src={URL.createObjectURL(newImage)} alt={newImage.name} />}
            </div>

            <label className='text-xs text-white opacity-90'>
                Заголовок поста:
                <input
                    type='text'
                    className='registretion-input'
                    placeholder='Заголовок'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </label>

            <label className='text-xs text-white opacity-80'>
                Текст поста:
                <textarea
                    className='addpost-inputtextArea'
                    placeholder='Текст поста'
                    onChange={e => setText(e.target.value)}
                    value={text}
                />
            </label>

            <div className='addPost-buttonContainer'>
                <button className='button-confirm' onClick={submitHandler}>
                    Обновить
                </button>
                <button className='button-cancel' onClick={clearHandler}>
                    Отменить
                </button>
            </div>
        </form>
    );
}

export default EditPostPage;