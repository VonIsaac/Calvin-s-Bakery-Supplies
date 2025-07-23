import { useAuthStore } from "../store/useAuth";
import { postLogin, getUser, queryClient } from "../../utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // ✅ correct
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import swal from "sweetalert";
export const useLogin = () => {
    const setAuth = useAuthStore(state => state.logInAuth);
    const location = useLocation(); // Get the current location to check the path
    const navigate = useNavigate(); // ✅ use this for navigation

    return useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            swal("Login Successful", "Welcome back!", "success");
            const token = data.token;
            Cookies.set("token", token, { expires: 7 })
            localStorage.setItem("token", token);
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);
                  // ✅ navigate instead of window.location
                  if (location.pathname === "/login") {
                    if (decodedToken.role === "admin") {
                        navigate("/admin-dashboard", { replace: true });
                    } else if (decodedToken.role === "cashier") {
                        navigate("/cashier-products", { replace: true });
                    } else {
                        navigate("/user-products", { replace: true });
                    }
                }
            setAuth({
                token,
                user: decodedToken,
                isAuthenticated: true
            })
            queryClient.invalidateQueries(['get-products']); // Invalidate user data query

        },
        onError: (error) => {
            console.error("Login Error:", error);
            swal("Login Failed", "Please check your credentials and try again.", "error");
        }
    })
};

export const useGetUser = () => {
    const setUser = useAuthStore(state => state.setUser);
    const token = useAuthStore(state => state.token);
    return useQuery({
        queryFn: async () => {
            if (!token) throw new Error("No token found");
            console.log("Token:", token);
            const response = await getUser({token});
            return response;
        },
        queryKey: ['get-user', token],
        onSuccess: (data) => {
            const userData = data.data; // Get the data property from the API response
            console.log("User Data:", userData);
            setUser(userData, token); // Use setUser method with user data and token
        },
        onError: (error) => {
            console.error("Token error:", error.message);
            Cookies.remove("token");
            
          },
        enabled: !!Cookies.get("token"), // Run only if token exists
        retry: false // Disable automatic retries
    });
};
