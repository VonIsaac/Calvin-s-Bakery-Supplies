import {QueryClient} from '@tanstack/react-query'
export const queryClient = new QueryClient()
import API from './API'
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode'

const postSignUp = async (data) => {
    try{
         const response  = await API.post('/user/signup', data)
        console.log(response);
     
        //alert("Account Created");
        return response.data;
    }catch(err){
        console.log({
            message: "AN ERROR!!!",
            err: err
        });

        return err;
    }
};


const postLogin = async (credentials) => {
    try{
        const response = await API.post( '/user/login', credentials);
        console.log(response);
        const {token, user} = response.data;
        Cookies.set("token", token, {
            expires: 1 / 24, // Expires in 1 hour, secure for HTTPS, and sameSite set to Strict
            sameSite: "Strict" // Prevents CSRF attacks
         });
        // set the user in local storage
        localStorage.setItem("user", JSON.stringify(user)); // Store user data in local storage
        return response.data;

    }catch(err){ 
        console.log(err);
        //return { success: false, message: err.response?.data?.message || "Login failed" };
        //check if credentials is invalid
        if (err.response && err.response.data) {
            //alert("Invalid Credentials");
            throw new Error(err.response.data.message || 'Login failed');
            
        }

        throw err;
    }
}

// handling for creating a cashier account  
const createCashier = async (cashier) => {
    try{
         const response = await API.post('/user/cashier', cashier);
         console.log(response);
     
        //alert("Account Created");
        return response.data;
    } catch(err){
        console.log({
            message: "Failed Creating Cashier",
            err: err
        });

        return err;
    }
}
 
//getting all the cashier data 
const getAllCashier = async ({signal}) => {
    try{
        const response = await API.get('/user/get-cashier-account', {signal});
        console.log(response)
        return response.data
    }catch(err){
        console.log(err)
    }
}

const deleteCashier = async (id) => {
     try{
        const response = await API.delete(`/user/get-cashier-account/${id}`)
        console.log(response);
        return response.data
     }catch(err){
        console.log(err);
        throw new Error("Delete Cashier Account Failed!"); // Ensures React Query handles error properly
     }
};

const postProducts = async (data) => {
    try{
        const response = await API.post('/admin/post-product', data);
        console.log(response);
        return response.data
    }catch(err){
        console.log(err);
        throw new Error("Post Login Failed"); // Ensures React Query handles error properly
     }
}

 const getProductsByCategory = async (category,{signal}) => {
   try{
    let url = '/product/get-products';

    if(category){ // check if wee click specific section 
        url +=  `?category=${category}`
    }

    const { data } = await API.get(url, {signal});
    return data;
   }catch(err){
    console.log(err)
    }
 };

 const getProducts = async ({signal}) => {
    try{
        const response = await API.get('/product/get-products', signal);
        console.log(response);

        return response.data;
    }catch(err){
    console.log(err)
    }
 };

 // gettting the data to both user and admin
const getUser = async ({ token }) => {
    try {
      const response = await API.get('/user/me',  {
        headers: {
          Authorization: `Bearer ${token}`,
           
        },
      });
      console.log("User data:", response.data);
      return response.data.data; // Extract the 'data' field directly if needed
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw err;
    }
  };


export{ 
    postSignUp,
    postLogin,
    createCashier,
    getAllCashier ,
    deleteCashier,
    postProducts,
    getProductsByCategory,
    getProducts,
    getUser
}