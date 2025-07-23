import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SidebarLayout from './SidebarLayout';

export default function CashierProducts() {
  return (
    <SidebarLayout>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'oklch(87.1% 0.15 154.449)',
          mb: 3,
          borderRadius: 1,
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'oklch(21% 0.006 285.885)',
              textAlign: 'center',
            }}
          >
            CASHIER PRODUCTS
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="bg-neutral-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <section className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-900 mb-8 text-center">Products</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Repeatable Product Cards */}
            {[
              {
                name: 'Starch',
                to: '/cashier-products/category/starch',
                image: 'src/assets/starch.jpg',
                desc:
                  'Offering a wide range of high-quality starch products, including cornstarch and cassava starch.',
              },
              {
                name: 'Assorted Items',
                to: '/cashier-products/category/assorted-items',
                image: 'src/assets/assorted-items.jpg',
                desc:
                  'A diverse selection of high-quality baking and cooking essentials.',
              },
              {
                name: 'Flour',
                to: '/cashier-products/category/flour',
                image: 'src/assets/Flours.jpg',
                desc:
                  'Providing high-quality flour varieties for all baking and cooking needs.',
              },
              {
                name: 'Special Flour',
                to: '/cashier-products/category/special-flour',
                image: 'src/assets/special-flour.jpg',
                desc:
                  'Premium specialty flours, perfect for baking bread, pastries, and gourmet creations.',
              },
              {
                name: 'Sugar',
                to: '/cashier-products/category/sugar',
                image: 'src/assets/sugar.jpg',
                desc:
                  'A wide range of high-quality sugars from refined to specialty varieties.',
              },
              {
                name: 'Lard',
                to: '/cashier-products/category/lard',
                image: 'src/assets/lard.jpg',
                desc:
                  'High-quality lard perfect for baking, frying, and cooking.',
              },
              {
                name: 'Margarine',
                to: '/cashier-products/category/margarine',
                image: 'src/assets/margarine.jpg',
                desc:
                  'Premium margarine ideal for pastries, cakes, and cooking.',
              },
              {
                name: 'Cooking Oil',
                to: '/cashier-products/category/oil',
                image: 'src/assets/oil.jpg',
                desc:
                  'A range of cooking oils perfect for frying, sautéing, and preparation.',
              },
            ].map((product, i) => (
              <div className="flex justify-center" key={i}>
                <Link
                  to={product.to}
                  className="flex flex-col w-full border-none rounded-lg shadow bg-orange-400 hover:bg-orange-500"
                >
                  <img
                    className="object-cover w-full h-48 rounded-t-lg"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                      {product.name}
                    </h5>
                    <p className="font-normal text-stone-100">{product.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}