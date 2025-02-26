// src/features/common/headerSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pageTitle: "Home",  // current page title state management
    noOfNotifications: 1,  // no of unread notifications
    newNotificationMessage: "",  // message of notification to be shown
    newNotificationStatus: 1,   // to check the notification type -  success/ error/ info
};

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setPageTitle: (state, action) => {
            state.pageTitle = action.payload.title;
        },
        removeNotificationMessage: (state) => {
            state.newNotificationMessage = "";
        },
        showNotification: (state, action) => {
            state.newNotificationMessage = action.payload.message;
            state.newNotificationStatus = action.payload.status;
        },
    }
});

export const { setPageTitle, removeNotificationMessage, showNotification } = headerSlice.actions;

export default headerSlice.reducer;
