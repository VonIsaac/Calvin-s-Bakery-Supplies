import { createContext,useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { postSignUp, queryClient, postLogin} from "../../utils/http";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    //register credentials
    const postSignUpMutation = useMutation({
        mutationFn: postSignUp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["signup"] });
        },
    });

    const postLoginMutation = useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            alert("Login Success");
            queryClient.invalidateQueries({ queryKey: ["login"] });

            
            // check the user role and redirect to the appropriate page
            if(data.user.role === "admin") {
                window.location.href = "/admin-dashboard"; // Redirect to admin dashboard
            }else if(data.user.role === "user") {
                window.location.href = "/user-products"; // Redirect to user dashboard
            }else if(data.user.role === "cashier"){
                window.location.href = "/cashier"; 
            }
        },
        onError: (error) => {
            alert(`Failed to login or invalid credentials:  ${error}` );
             
            console.error(error);
        }

    })

    return (
        <AuthContext.Provider value={{ postSignUpMutation, postLoginMutation }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => { // Custom hook to use the AuthContext
    return useContext(AuthContext);
}