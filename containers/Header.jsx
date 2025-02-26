// src/containers/Header.js
import { themeChange } from 'theme-change';
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { logout } from '../features/user/userSlice';
import { RIGHT_DRAWER_TYPES } from '/src/utils/globalConstantUtil';
import TopSideButtons from '../components/TopSideButtons';
import { FilterContext } from '../contexts/FilterContext';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { noOfNotifications, pageTitle } = useSelector(state => state.header);
    const { user } = useSelector(state => state.user);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
    const { setFilter, setSearch } = useContext(FilterContext);

    useEffect(() => {
        themeChange(false);
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setCurrentTheme('dark');
            } else {
                setCurrentTheme('light');
            }
        }
    }, [currentTheme]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const openNotification = () => {
        dispatch(openRightDrawer({ header: 'Notificaciones', bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const applyFilter = (selectedCategory) => {
        setFilter(selectedCategory);
    };

    const applySearch = (searchText) => {
        setSearch(searchText);
    };

    const removeFilter = () => {
        setFilter(null);
        setSearch("");
    };

    return (
        <>
            <div className="navbar sticky top-0 bg-base-100 z-10 shadow- pt-0 pb-0">
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        <Bars3Icon className="h-5 inline-block w-5" />
                    </label>
                    <h1 className="text font-semibold ml-2">{pageTitle}</h1>
                </div>
                <div className="flex-1">
                    <TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />
                </div>
                <div className="flex-none">
                    <div className=' hidden md:block'>
                        <label className="swap ml-4">

                            <input type="checkbox" />
                            <SunIcon
                                data-set-theme="light"
                                data-act-class="ACTIVECLASS"
                                className={'fill-current w-6 h-6 ' + (currentTheme === 'dark' ? 'swap-on' : 'swap-off')}
                            />
                            <MoonIcon
                                data-set-theme="dark"
                                data-act-class="ACTIVECLASS"
                                className={'fill-current w-6 h-6 ' + (currentTheme === 'light' ? 'swap-on' : 'swap-off')}
                            />
                        </label>

                        <button className="btn btn-ghost ml-4 btn-circle" onClick={openNotification}>
                            <div className="indicator">
                                <BellIcon className="h-6 w-6" />
                                {noOfNotifications > 0 ? (
                                    <span className="indicator-item badge badge-secondary badge-sm">
                                        {noOfNotifications}
                                    </span>
                                ) : null}
                            </div>
                        </button>
                    </div>

                    <div className="dropdown dropdown-end md:ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/avatar.png" alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <span className='pl-3 pr-3 pt-2 pb-2 text-center'>{user ? user.email : 'Cargando...'}</span>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a>Perfil</a></li>
                            <li><a>Usuarios</a></li>
                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={handleLogout}>Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
