import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginPage = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-1/4 h-60 mx-auto mt-40' >
            <h1 className='text-lg text-white text-center'>Авторизация</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input type="text" placeholder='Username' 
                    className='registretion-input'
                />
            </label>
            <label className='text-xs text-gray-400'>
                Password:
                <input type="password" placeholder='Password' 
                    className='registretion-input'
                />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button type="submit" 
                    className='button-submit'
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