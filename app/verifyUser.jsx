// src/app/useVerifyUser.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUserProfile } from '../features/user/userSlice';
import { getAuthToken, removeAuthToken } from './authUtils';

const useVerifyUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const token = getAuthToken();
  
  useEffect(() => {
    const verify = async () => {
      if (token && status === "idle" && !user) {
        try {
          const userAgent = navigator.userAgent;
          const profileResponse = await dispatch(fetchUserProfile({ token, userAgent }));
          if (profileResponse.payload.error === "Invalid token.") {
            removeAuthToken();
            return <Navigate to='/login' />;
          }
        } catch (error) {
          removeAuthToken();
          return <Navigate to='/login' />;
        }
      }
    };

    verify();
  }, [dispatch, user, status, token]);
};

export default useVerifyUser;
