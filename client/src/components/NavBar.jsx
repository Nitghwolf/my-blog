import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, logout } from '../store/features/auth/authSlice';

const NavBar = () => {
    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        navigate('/');
        toast('Вы вышли из системы');
    };

    const activeStyle = {
        color: "white"
    };

    return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
                E
            </span>
            {isAuth && (
                <ul className="flex gap-8">      
                    <li>
                        <NavLink to={'/'} href="/" className='text-xs text-gray-400 hover:text-white'
                            style={({isActive})  => isActive ?  activeStyle : undefined}
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/posts'} href="/" className='text-xs text-gray-400 hover:text-white'
                            style={({isActive})  => isActive ?  activeStyle : undefined}
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/new'} href="/" className='text-xs text-gray-400 hover:text-white'
                            style={({isActive})  => isActive ?  activeStyle : undefined}
                        >
                            Добавить пост
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
                {isAuth ? (
                    <button onClick={handlerLogout}>Выйти</button>
                    )
                    : <Link to={'/login'} >Войти</Link>
                }
            </div>
        </div>
    );
}

export default NavBar;