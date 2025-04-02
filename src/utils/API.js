import axios from "axios";
import Cookies from 'js-cookie';

const API = axios.create({  // Create an instance of axios with default settings
    baseURL: "http://localhost:3000",
    headers:{
        "Content-Type": "application/json",
        
    },
    withCredentials: true // Allows cookies to be sent
});

API.interceptors.request.use((config) => {
    const token = Cookies.get("token"); // getting the token from cookies
    console.log("Token being sent:", token); // Debugging line to check the token value
    if (token) { // check if token is present
        config.headers["Authorization"] = `Bearer ${token}`; // set the token in the header
    }
    return config; // return the config object
});

export default API;