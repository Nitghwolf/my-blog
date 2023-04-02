import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../store/features/auth/async';
import { checkIsAuth } from '../store/features/auth/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status} = useSelector((state) => state.auth);
    const isAuth = useSelector(checkIsAuth);

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        status && toast(status);
        isAuth && navigate('/');
    }, [status, isAuth, navigate]);

    const handleSubmit = () => {
        try{
            dispatch(loginUser({username, password}));
        }
        catch(error){
            toast(error);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40' >
            <h1 className='text-lg text-white text-center'>Авторизация</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    className='registretion-input'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Password:
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='registretion-input'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button 
                    type="submit" 
                    className='button-submit'
                    onClick={handleSubmit}
                >
                    Войти
                </button>
                <NavLink 
                    to={'/register'}
                    className='nav-register'
                >
                    Нет аккаунта?
                </NavLink>
            </div>
        </form>
    );
}

export default LoginPage;