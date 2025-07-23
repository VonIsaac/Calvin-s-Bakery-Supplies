import {QueryClient} from '@tanstack/react-query'
export const queryClient = new QueryClient()
import API from './API'
import Cookies from "js-cookie";

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
        const {token} = response.data;
        console.log("Token:", token);
        Cookies.set("token", token, {
            expires: 1 / 24, // Expires in 1 hour, secure for HTTPS, and sameSite set to Strict
            sameSite: "Strict" // Prevents CSRF attacks
         });
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
      return response.data; // Extract the 'data' field directly if needed
    } catch (err) {
      console.error("Error fetching user data:", err);
      throw err;
    }
  };

  const postLogout = async () => {
    try{
        const response = await API.post('/user/logout')
        console.log(response)
        Cookies.remove('token'); // Remove from client-side (if stored)
       

    }catch(err){
        console.log(err )
    }
}


const addToCart = async(productId, quantity, priceType) => {
    try{
        const response = await API.post('/product/post-cart', {
            productId,
            quantity,
            priceType
        })  
        console.log(response);
        return response.data.cart;
    }catch(err){
        console.log(err);
        throw new Error("Failed to add to cart");
    }
}

const getCart = async () => {
    try{
        const response = await API.get('/product/get-cart');
        console.log(response);
        return response.data.items;
    }catch(err){
        console.log(err);
        throw new Error("Failed to get cart");
    }
}

const removeFromCart = async (productId) => {
    try{
        const response = await API.post('/product/remove-from-cart', { productId });
        console.log(response);
        return response.data.cart; 
    }catch(err){
        console.log(err);
        throw new Error("Failed to remove item from cart");
    }
}

const checkout = async(name, address, phoneNumber, pickupDate, deliveryMode) => {
    try{
        const response = await API.post('/product/post-checkout', {
            name,
            address,
            phoneNumber,
            pickupDate,
            deliveryMode
        });
        console.log(response);
        return response.data.order
    }catch(err){
        console.log(err);
        throw new Error("Checkout failed");
    }
}

const getOrders = async () => {
   try{
    const response = await API.get('/product/get-order');
    console.log(response);
    return response.data.orders; 
   }catch(err){
    console.log(err);
    throw new Error("Failed to get orders");
   }
}

const getSalesAnalytics = async () => {
    try {
        const response = await API.get('/product/category-sales');
        console.log(response);
        return response.data; 
    } catch (err) {
        console.error("Error fetching category sales analytics:", err);
        throw new Error("Failed to fetch category sales analytics");
    }
}

const getCustomerOrdersDetails = async () => {
    try {
        const response = await API.get('/product/get-user-orders');
        console.log(response); // optional for debugging
        return response.data.customerInfos; // ✅ correct key based on your backend
    } catch (err) {
        console.error("Error fetching customer orders details:", err);
        throw new Error("Failed to fetch customer orders details");
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
    getUser,
    postLogout,
    addToCart,
    getCart,
    removeFromCart,
    checkout,
    getOrders,
   getSalesAnalytics,
   getCustomerOrdersDetails
}