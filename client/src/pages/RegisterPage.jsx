import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/features/auth/async';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        try{
            dispatch(registerUser({username, password}));
            setPassword('');
            setUserName('');
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40' >
            <h1 className='text-lg text-white text-center'>Регистрация</h1>
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
                    Подтвердить
                </button>
                <NavLink 
                    to={'/login'}
                    className='nav-register'
                >
                    Есть аккаунта
                </NavLink>
            </div>
        </form>
    );
}

export default RegisterPage;