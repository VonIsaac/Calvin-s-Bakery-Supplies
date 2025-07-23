import React from 'react'
import Header from '../../UI/Header'
import logo from '../../../assets/logo.png';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from '../../UI/Footer';
export default function WelcomePage() {
  return (
    <>
      <Header>
        <img src={logo} alt="logo" className='w-[180px]'/>
      </Header>

            {/* Hero Section with Gradient */}
      <section 
        className="relative py-24 md:py-36 overflow-hidden min-h-[80vh]"
        style={{ 
          background: 'linear-gradient(135deg, oklch(98.5% 0 0) 0%, oklch(98.5% 0 0) 50%, oklch(98.5% 0 0) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientWave 12s ease infinite'
        }}>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-stone-900 font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Welcome to Calvin's Bakery
          </h1>
          <p className="text-stone-900 text-xl md:text-2xl max-w-2xl mx-auto mb-10">
            Premium baking ingredients and supplies for professionals and home bakers alike.
          </p>
          <Button 
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#f97316', // Tailwind's bg-orange-500
              color: 'white',
              fontWeight: 'bold',
              px: 6,
              py: 1.5,
              borderRadius: '9999px', // rounded-full
              '&:hover': {
                backgroundColor: '#ea580c', // Tailwind's bg-orange-600
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)' // warm orange shadow
              },
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Browse Now
          </Button>

        </div>
      </section>

            {/* Products Section */}
        <div className='bg-neutral-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
               <section className='max-w-7xl mx-auto'>
               <h1 className='text-3xl font-bold text-stone-900 mb-8 text-center'>Our Products</h1>
       
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                 {/* Starch Card */}
                 <div className='flex justify-center'>
                   <Link to= '/landing-page-category/starch' className="flex flex-col w-full  border border-none rounded-lg shadow  border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/starch.jpg" alt="starch" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Starch</h5>
                       <p className="font-normal  dark:text-gray-400 text-stone-100">
                         Offering a wide range of high-quality starch products, including cornstarch and cassava starch, perfect for baking, cooking, and food processing.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Assorted Items Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/assorted-items'  className="flex flex-col w-full  border border-none rounded-lg shadow  border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/assorted-items.jpg" alt="assorted" />
                     <div className="p-4">
                       <h5   className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Assorted Items</h5>
                       <p className="font-normal  dark:text-gray-400 text-stone-100">
                         A diverse selection of high-quality baking and cooking essentials, including flours, sugars, oils, starches, and other specialty ingredients.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Flour Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/flour'  className="flex flex-col w-full  border border-none rounded-lg shadow  border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/Flours.jpg" alt="flour" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Flour</h5>
                       <p  className="font-normal  dark:text-gray-400 text-stone-100">
                         Providing high-quality flour varieties for all baking and cooking needs. From all-purpose and bread flour to specialty and premium blends.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Special Flour Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/special-flour' className="flex flex-col w-full  border border-none rounded-lg shadow  border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/special-flour.jpg" alt="special" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Special Flour</h5>
                       <p  className="font-normal  dark:text-gray-400 text-stone-100">
                         A premium selection of high-quality specialty flours, perfect for baking bread, pastries, cakes, and other gourmet creations.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Sugar Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/sugar'className="flex flex-col w-full  border border-none rounded-lg shadow hover:bg-gray-100 border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/sugar.jpg" alt="sugar" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Sugar</h5>
                       <p  className="font-normal  dark:text-gray-400 text-stone-100" >
                         Offering a wide range of high-quality sugars, from refined and washed sugar to specialty varieties.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Lard Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/lard'className="flex flex-col w-full  border border-none rounded-lg shadow hover:bg-gray-100 border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/lard.jpg" alt="lard" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Lard</h5>
                       <p  className="font-normal  dark:text-gray-400 text-stone-100">
                         High-quality lard perfect for baking, frying, and cooking. Ideal for creating flaky pastries, rich doughs.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Margarine Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/margarine'className="flex flex-col w-full  border border-none rounded-lg shadow hover:bg-gray-100 border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/margarine.jpg" alt="margarine" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Margarine</h5>
                       <p className="font-normal text-stone-100">
                         A premium-quality margarine perfect for baking, cooking, and spreading. Ideal for creating smooth textures in pastries, cakes, and doughs.
                       </p>
                     </div>
                   </Link>
                 </div>
       
                 {/* Cooking Oil Card */}
                 <div className='flex justify-center'>
                   <Link to='/landing-page-category/oil'className="flex flex-col w-full  border border-none rounded-lg shadow hover:bg-gray-100 border-gray-700 bg-orange-400 hover:bg-orange-500">
                     <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/oil.jpg" alt="oil" />
                     <div className="p-4">
                       <h5  className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Cooking Oil</h5>
                       <p className="font-normal text-stone-100">
                         A range of high-quality cooking oils perfect for frying, sautéing, and general food preparation.
                       </p>
                     </div>
                   </Link>
                 </div>
               </div>
             </section>
           </div>
      <Footer>
        <img src={logo} className="h-8" alt="Calvin's Bakery Logo" />
      </Footer>
    </>
  )
}