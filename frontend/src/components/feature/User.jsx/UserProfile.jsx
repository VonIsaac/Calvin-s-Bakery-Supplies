import React from 'react';
import { Mail, MapPin, User } from 'lucide-react';
import { useGetUser } from '../../hooks/hooks';
import { useAuthStore } from '../../store/useAuth';
const UserProfile = () => {
  const user = useAuthStore((state) => state.user);
  useGetUser({});
  const userProfile = user;

  const handleDebug = () => {
    
    console.log("User Profile:", userProfile);
    console.log("User Role:", userProfile?.role);
    console.log("User Email:", userProfile?.email);
    console.log("User Username:", userProfile?.username);

  }

  return (
  <>

<div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>
      
      {/* Profile Avatar */}
      <div className="relative -mt-16 flex justify-center">
        <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="px-6 py-6 text-center">
        {/* Name */}
        <h1 className="text-2xl font-bold text-black mb-2">{userProfile?.username}</h1>
        
        {/* Email */}
        <div className="flex items-center justify-center mb-4 text-gray-600 hover:text-blue-600 transition-colors">
          <Mail className="w-5 h-5 mr-2" />
          <span className="text-2xl font-medium">{userProfile?.email}</span>
        </div>
        
        {/* Address */}
        <div className="flex items-start justify-center text-gray-600 hover:text-purple-600 transition-colors">
          <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm font-medium text-left">{userProfile?.role}</span>
        </div>

      </div>
     
      {/* Bottom decorative element */}
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
    </div>
    <button onClick={handleDebug}>CLICK</button>
  </>
  );
};

export default UserProfile;