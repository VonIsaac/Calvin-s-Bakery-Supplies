

import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { useAuthStore } from './store/useAuth'
import { useGetUser } from './hooks/hooks'

export default function ProtectedRoutes({children, role = []}) {
    const { isAuthenticated, user, token } = useAuthStore();
    const location = useLocation();

    const { isLoading, isError } = useGetUser();

    // Show loading while checking authentication
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div>Loading...</div>
        </div>
      );
    }
    if (!token || !isAuthenticated || isError) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    if(role.length > 0 && user?.role && !role.includes(user.role)){
        return <Navigate to="/login" replace />;
    }

    return children;
}
