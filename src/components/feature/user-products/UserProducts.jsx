import React from 'react'
import Header from '../../UI/Header';
import Footer from '../../UI/Footer';
import {  Link } from 'react-router-dom';
export default function UserProduct() {
  //const navigate = useNavigate() // used this hook redirect to pages wee click
  
  return (
    <>
    <main>
      <Header>
        <img src="src/assets/logo.png" alt="logo" className='w-[180px]'/>
      </Header>
      <div>
        <section className="bg-white dark:bg-gray-900 min-h-[70vh] flex items-center"> {/* Changed to min-h-[70vh] and flex */}
            <div className="grid max-w-screen-xl px-4 py-16 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                  Calvin&apos;s Bakery Supplies
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Your trusted source for high-quality baking ingredients and essentials. Offering a wide range of flours, 
                  sugars, oils, and specialty products to meet the needs of home bakers and commercial bakeries.
                </p>
                <div className="flex flex-wrap gap-4"> {/* Changed to flex-wrap for better mobile behavior */}
                  <Link to='/all-products' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    See All 
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </Link>
                  <Link to='/user-products/cart' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Go to Cart&apos;s
                  </Link> 
                </div>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex lg:items-center"> {/* Added lg:items-center */}
                <img src="src\assets\undraw_bear-market_dhi3.svg" alt="mockup" className="w-full" />
              </div>                
            </div>
        </section>   
      </div>


      <div className='bg-slate-950 min-h-screen py-8 px-4 sm:px-6 lg:px-8'>
        <section className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-white mb-8 text-center'>Our Products</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Starch Card */}
          <div className='flex justify-center'>
            <Link to= '/user-products/category/starch' className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/starch.jpg" alt="starch" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Starch</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Offering a wide range of high-quality starch products, including cornstarch and cassava starch, perfect for baking, cooking, and food processing.
                </p>
              </div>
            </Link>
          </div>

          {/* Assorted Items Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/assorted-items'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/assorted-items.jpg" alt="assorted" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Assorted Items</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  A diverse selection of high-quality baking and cooking essentials, including flours, sugars, oils, starches, and other specialty ingredients.
                </p>
              </div>
            </Link>
          </div>

          {/* Flour Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/flour'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/Flours.jpg" alt="flour" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Flour</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Providing high-quality flour varieties for all baking and cooking needs. From all-purpose and bread flour to specialty and premium blends.
                </p>
              </div>
            </Link>
          </div>

          {/* Special Flour Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/special-flour'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/special-flour.jpg" alt="special" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Special Flour</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  A premium selection of high-quality specialty flours, perfect for baking bread, pastries, cakes, and other gourmet creations.
                </p>
              </div>
            </Link>
          </div>

          {/* Sugar Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/sugar'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/sugar.jpg" alt="sugar" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Sugar</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Offering a wide range of high-quality sugars, from refined and washed sugar to specialty varieties.
                </p>
              </div>
            </Link>
          </div>

          {/* Lard Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/lard'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/lard.jpg" alt="lard" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Lard</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  High-quality lard perfect for baking, frying, and cooking. Ideal for creating flaky pastries, rich doughs.
                </p>
              </div>
            </Link>
          </div>

          {/* Margarine Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/margarine'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/margarine.jpg" alt="margarine" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Margarine</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  A premium-quality margarine perfect for baking, cooking, and spreading. Ideal for creating smooth textures in pastries, cakes, and doughs.
                </p>
              </div>
            </Link>
          </div>

          {/* Cooking Oil Card */}
          <div className='flex justify-center'>
            <Link to='/user-products/category/oil'  className="flex flex-col w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full h-48 rounded-t-lg" src="src/assets/oil.jpg" alt="oil" />
              <div className="p-4">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Cooking Oil</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  A range of high-quality cooking oils perfect for frying, sautéing, and general food preparation.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
      

    </main>
    <Footer>
      <img  src="src/assets/logo.png"  className="h-8" alt="Calvin's Bakery Logo" />
    </Footer>
    </>
  )
}