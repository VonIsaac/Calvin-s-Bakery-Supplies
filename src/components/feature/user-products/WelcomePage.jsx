import React from 'react'
import Header from '../../UI/Header'
import Footer from '../../UI/Footer'
import logo from '../../../assets/logo.png';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BaronFlour from '../../../assets/welcomeProduct/Baron All Porpose Flour.jpg'
import Cake from '../../../assets/welcomeProduct/Cake Emulsifier 4kgs.jpg'
import Freeto from '../../../assets/welcomeProduct/FL40- Freeto Lard 40kg.jpg'
import Pottasium from '../../../assets/welcomeProduct/Potassium Sorbate.jpg'
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
        <div className="bg-neutral-100 py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">Featured Products</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Product Card 1 */}
                <div 
                    className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                    style={{ border: 'none' }}
                >
                    <div 
                    className="h-48 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'white' }}
                    >
                    <img 
                        src={Cake} 
                        alt="cake" 
                        className="max-h-full max-w-full object-contain"
                    />
                    </div>
                    <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">Cake Emulsifier 4kgs</h3>
                    <p className=" mb-4 text-stone-900">
                        Ideal for commercial baking, ensuring soft, moist, and well-structured cakes with a smooth consistency.
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-bold text-lg">₱1,242.14</span>
                    </div>
                    </div>
                </div>

                {/* Product Card 2 */}
                <div 
                    className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                    style={{ border: 'none' }}
                >
                    <div 
                    className="h-48 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'white' }}
                    >
                    <img 
                        src={Pottasium} 
                        alt="pottasium" 
                        className="max-h-full max-w-full object-contain"
                    />
                    </div>
                    <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">Potassium Sorbate</h3>
                    <p className=" mb-4 text-stone-900">A high-quality preservative used to extend the shelf life of food</p>
                    <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-bold text-lg">₱92</span>
                    </div>
                    </div>
                </div>

                {/* Product Card 3 */}
                <div 
                    className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                    style={{ border: 'none' }}
                >
                    <div 
                    className="h-48 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'white' }}
                    >
                    <img 
                        src={Freeto} 
                        alt="freeto" 
                        className="max-h-full max-w-full object-contain"
                    />
                    </div>
                    <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">FL40- Freeto Lard 40kg</h3>
                    <p className=" mb-4 text-stone-900">Made from high-quality lard, ensuring a premium and reliable product.</p>
                    <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-bold text-lg">₱3,500</span>
                    </div>
                    </div>
                </div>

                {/* Product Card 4 */}
                <div 
                    className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
                    style={{ border: 'none' }}
                >
                    <div 
                    className="h-48 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'white' }}
                    >
                    <img 
                        src={BaronFlour} 
                        alt="Baron" 
                        className="max-h-full max-w-full object-contain"
                    />
                    </div>
                    <div className="p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">Baron All Purpose Flour</h3>
                    <p className=" mb-4 text-stone-900">A versatile, high-quality flour suitable for a wide range of baking</p>
                    <div className="flex justify-between items-center">
                        <span className="text-orange-500 font-bold text-lg">₱1,750</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
      <Footer>
        <img src={logo} className="h-8" alt="Calvin's Bakery Logo" />
      </Footer>
    </>
  )
}