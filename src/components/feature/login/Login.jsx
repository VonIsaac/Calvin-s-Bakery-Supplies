



import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../hooks/hooks";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
export default function LoginForm() {
    const postLoginMutation = useLogin();
    const [isCredentials, setIsCredentials] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => { // handleChange function to update the state
        setIsCredentials(prev => ({
            ...prev, // spread the existing data and use object key 
            [e.target.name]: e.target.value // set the new value
        }))
    };

    // perform login action
    const handleLoginCreds = (e) => {
        e.preventDefault(); // prevent the default form submission
        postLoginMutation.mutate(isCredentials);
        console.log("Login credentials submitted:", isCredentials);
        
    
    }

  return (
    <>
      
    
        <div className="flex flex-col justify-center items-center h-screen border-2 bg-[url(/src/assets/bg-form.png)] bg-cover bg-no-repeat bg-center ">
            {/* <ResponsiveDialog  onClose={handleCloseDialog} />*/}
                <form  onSubmit={ handleLoginCreds} className="border-2 rounded-2xl border-none h-[400px] w-[450px] bg-white/15 backdrop-blur-lg  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                    <h1 className="text-center text-3xl my-8 font-bold tracking-wide uppercase">Log In</h1>
                    <div className="flex flex-col justify-center items-center m-2.5">
                        
                        <div className="m-3">
                            <input
                                className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px]  px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={isCredentials.email}
                                onChange={handleChange}
                            
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
                            />
                        </div>
                        
                        <div className="m-3">
                        <motion.button
                            type="submit"
                            disabled={postLoginMutation.isLoading} // disable the button when loading
                            className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200 cursor-pointer"
                            whileTap={{ scale: 0.9 }}
                            >
                            {postLoginMutation.isLoading ? "Submitting..." : "Submit"}
                        </motion.button>
                        </div>
                        <p>
                           <Link to='/signup'> Don't have an account? <strong>Register</strong></Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
  )
}
