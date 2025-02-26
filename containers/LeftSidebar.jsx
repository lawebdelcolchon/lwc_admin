import routes from '../routes/sidebar'
import { NavLink, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import { FaXmark } from "react-icons/fa6";

function LeftSidebar() {
    const location = useLocation();

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }

    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-0 pl-0 pr-0 bg-base-100 min-h-full text-base-content" style={{ "width": "15rem" }}>
                <div className="mb-2 font-semibold text-xl" style={{background: "#151a31"}}>
                    <Link to={'/app/dashboard'} className="pb-0 pt-0"><img src="/logo-admin.png" alt="logo" /></Link>
                </div>
                <button className="btn btn btn-circle btn-link z-50 top-0 right-0 mt-2.5 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <FaXmark className="h-5 inline-block w-6" />
                </button>
                <div className='pt-0 pl-2 pr-2 pb-2'>
                    {
                        routes.map((route, k) => {
                            return (
                                <li key={k} className="">
                                    {
                                        route.submenu ?
                                            <SidebarSubmenu {...route} /> :
                                            (
                                                <NavLink
                                                    end
                                                    to={route.path}
                                                    className={({ isActive }) => `${isActive ? 'font-semibold bg-base-200' : 'font-normal'}`}>
                                                    {route.icon} {route.name}
                                                    {
                                                        location.pathname === route.path ? (
                                                            <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                                                                aria-hidden="true"></span>
                                                        ) : null
                                                    }
                                                </NavLink>
                                            )
                                    }

                                </li>
                            )
                        })
                    }
                </div>
            </ul>
        </div>
    )
}

export default LeftSidebar;
