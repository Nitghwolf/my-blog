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
        <div className='navBarContainer'>
            <span className='navBarIcon'>
                E
            </span>
            {isAuth && (
                <ul className="flex gap-8">      
                    <li>
                        <NavLink to={'/'} href="/" className='navBarLink'
                            style={({isActive})  => isActive ?  activeStyle : undefined}
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/posts'} href="/" className='navBarLink'
                            style={({isActive})  => isActive ?  activeStyle : undefined}
                        >
                            Мои посты
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/new'} href="/" className='navBarLink'
                            style={({isActive})  => isActive ?  activeStyle : undefined}
                        >
                            Добавить пост
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className='exitButton'>
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