import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import {queryClient} from './utils/http'
import LoginForm from './components/feature/login/Login'
import SignUp from './components/feature/signup/SignUp'
import UserProduct from './components/feature/user-products/UserProducts'
import CreateCashierAcc from './components/feature/admin-list/CreateCashierAcc'
import Analytics from './components/feature/admin-list/Analytics'
import  AdminProducts from './components/feature/admin-list/AdminProducts'
import Category from './components/feature/user-products/Category'
import AllProducts from './components/feature/user-products/AllProducts'
import CashierDashboard from './components/feature/cashier/CashierDashboard'
import Cart from './components/feature/user-products/Cart'
import WelcomePage from './components/feature/user-products/WelcomePage'
import UserProfile from './components/feature/User.jsx/UserProfile'
import LandingPageCategory from './components/ReusableComponents/LandingPageCategory'
import CashierProducts from './components/feature/cashier/CashierProducts'
import CashierProductsCategory from './components/feature/cashier/CashierProductsCategory'
import OrderHistory from './components/feature/user-products/OrderHistory'

function App() {
  
   const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage/>,
    },
    {
      path: '/landing-page-category/:category',
      element: <LandingPageCategory />
    },
    {
      path: '/login',
      element: <LoginForm />
    },
    {
       path: '/signup',
        element: <SignUp />,
    },
    // user routes
    {
      path: '/user-products',
      element: (
          <UserProduct />
      ),
    },
    {
      path: '/all-products',
      element: <AllProducts />
    },
    {
      path: '/user-products/category/:category',
      element: <Category />
    },

    {
      path: '/user-products/cart',
      element: <Cart />
    },

    {
      path: '/user-products/order-history',
      element: <OrderHistory />
    },
    // admin routes
    {
      path: '/admin-dashboard',
      element: <Analytics />,
    },

    {
      path: '/admin-products',
      element: <AdminProducts />,
    },
    {
      path: '/create-cashier',
      element: <CreateCashierAcc />,
    },
    // cashier routes
    {
      path: '/cashier-products',
      element: <CashierProducts />
    },
    {
      path: '/cashier-products/category/:category',
      element: <CashierProductsCategory />
    },
    {
      path: '/cashier',
      element: <CashierDashboard />
    }

   ])
  return (
    <>
      <div className=''>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App