import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importar estilos de react-toastify
import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from './RightSidebar';
import ModalLayout from "./ModalLayout";
import { removeNotificationMessage } from "../features/common/headerSlice";

function Layout() {
    const dispatch = useDispatch();
    const { newNotificationMessage, newNotificationStatus } = useSelector(state => state.header);

    useEffect(() => {
        if (newNotificationMessage !== "") {
            if (newNotificationStatus === 1) toast.success(newNotificationMessage, { position: toast.POSITION.TOP_RIGHT });
            if (newNotificationStatus === 0) toast.error(newNotificationMessage, { position: toast.POSITION.TOP_RIGHT });
            dispatch(removeNotificationMessage());
        }
    }, [newNotificationMessage]);

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
                <PageContent />
                <LeftSidebar />
            </div>

            <RightSidebar />

            {/* Notification container */}
            <ToastContainer />

            {/* Modal layout container */}
            <ModalLayout />
        </>
    );
}

export default Layout;
