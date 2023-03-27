import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createPost } from '../store/features/post/async';
import { useNavigate } from 'react-router-dom';

const AddPostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    const submitHandler = () => {
        try {
            const data = new FormData();
            data.append('title', title);
            data.append('text', text);
            data.append('image', image);
            dispatch(createPost(data));
            navigate('/');
        } catch (error) {
            toast(error);
        }
    };

    const clearHandler = () => {
        setTitle('');
        setText('');
        setImage('');        
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
                    onChange={e => setImage(e.target.files[0])}
                />
            </label>
            <div className='flex object-cover py-2'>
                {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
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
                    Добавить
                </button>
                <button className='button-cancel' onClick={clearHandler}>
                    Отменить
                </button>
            </div>
        </form>
    );
}

export default AddPostPage;