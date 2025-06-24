import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import {queryClient} from './utils/http'
import { AuthProvider } from './components/store/AuthProvider'

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
function App() {
  
   const router = createBrowserRouter([
    {
      path: '/',
      element: <WelcomePage/>,
    },
    {
      path: '/login',
      element: <LoginForm />
    },
    {
       path: '/signup',
        element: <SignUp />,
    },

    {
      path: '/admin-dashboard',
      element: <Analytics />,
    },
    {
      path: '/create-cashier',
      element: <CreateCashierAcc />,
    },

    {
      path: '/admin-products',
      element: <AdminProducts />,
    },

      
    {
      path: '/user-products',
      element: <UserProduct />,
    },
    {
      path: '/user-products/category/:category',
      element: <Category />
    },
    {
      path: '/all-products',
      element: <AllProducts />
    },

    {
      path: '/user-products/cart',
      element: <Cart />
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
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App