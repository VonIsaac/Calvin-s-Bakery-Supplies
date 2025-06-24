import React from 'react'

import { motion } from "framer-motion";
import { Link } from 'react-router';
import { useAuth } from '../../store/AuthProvider';
import { useNavigate } from 'react-router';
import { useState } from 'react';
export default function SignUp() {
    const navigate = useNavigate()
    const {  postSignUpMutation} = useAuth()
    const [isCredentials, setIsCredentials] = useState({
        username: "",
        email: "",
        password: ""
    });

    const formDatas = {
        username: isCredentials.username || "",
        email: isCredentials.email || "",  // Ensure it’s never undefined
        password: isCredentials.password || "",
        
   };

   const handleChange = (e) => {
    setIsCredentials({
        // spread the existing data and use object key 
        ...isCredentials, 
        [e.target.name]: e.target.value  
    }); 

    };

    const handleSignupCreds = (e) => {
        e.preventDefault();
        //check if email is a valid gmail address and password are match
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(isCredentials.email)) {
            alert("Please enter a valid Gmail address.(@gmail.com)");
            return;
        }
        // get the form data
         // Trigger mutation from context
         postSignUpMutation.mutate(formDatas, {
            onSuccess: () => {
                navigate("/login"); // Navigate to login page after success
                alert("Account Created");
                setIsCredentials({ username: "", email: "", password: "",  }); // Clear form data
            },
            onError: (error) => {
                alert("Account creation failed!");
                console.error(error);
            }
        });

    }

    return (
        <>
          
        
            <div className="flex flex-col justify-center items-center  border-2 bg-[url(/src/assets/bg-form.png)] bg-cover bg-no-repeat bg-center h-screen">
                {/* <ResponsiveDialog  onClose={handleCloseDialog} />*/}
                    <form onSubmit={handleSignupCreds} className="border-2 rounded-2xl border-none h-[400px] w-[450px] bg-white/15 backdrop-blur-lg shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                        <h1 className="text-center text-3xl my-6 font-bold tracking-wide uppercase">Sign up</h1>
                        <div className="flex flex-col justify-center items-center m-2.5">
                            <div className="m-3">
                               
                                <input
                                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    label="Username"
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    value={isCredentials.username}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="m-3">
                                <input
                                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={isCredentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="m-3">
                                <input
                                className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={isCredentials.password}
                                    onChange={handleChange}
                                    requiredz
                                />
                            </div>
                            <div className="m-3">
                            <motion.button
                                type='submit'
                                className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200 cursor-pointer"
                                whileTap={{ scale: 0.9 }}>
                                {postSignUpMutation.isLoading ? "Submitting..." : "Submit"} 
                            </motion.button>
                            </div>
                            <p>
                                 <Link to='/login'> Already have an account? <strong>Login</strong></Link>
                            </p>
                        </div>
                    </form>
                </div>
            </>
      )
}