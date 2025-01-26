import React, { useState, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import img1 from '../assets/marketplace/m1.jpg'
import img2 from '../assets/marketplace/m2.jpg'

import img3 from '../assets/marketplace/m3.jpg'

import img4 from '../assets/marketplace/m4.jpg'

const initialState = {
  cart: [],
  redeemHistory: []
};

function marketplaceReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    case 'REDEEM_ITEMS':
      return {
        ...state,
        redeemHistory: [...state.redeemHistory, ...state.cart],
        cart: []
      };
    default:
      return state;
  }
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Bamboo Pen Set',
    description: 'Eco-friendly writing set made from sustainable bamboo',
    image: img4,
    price: 250,
    impact: '5 trees planted'
  },
  {
    id: 2,
    name: 'Recycled Notebook',
    description: '100% recycled paper notebook with organic cotton cover',
    price: 150,
    image: img1,
    impact: '3 kg CO2 offset'
  },
  {
    id: 3,
    name: 'Solar Power Bank',
    description: 'Portable solar charger with high-efficiency panels',
    price: 750,
    image: img3,
    impact: '10 hours of clean energy'
  },
  {
    id: 4,
    name: 'Organic Cotton Tote',
    description: 'Reusable shopping bag made from certified organic cotton',
    price: 200,
    image: img2,
    impact: '1 plastic bag eliminated'
  }
];

const SustainableMarketplace = () => {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);
  const [activeSection, setActiveSection] = useState('products');

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const redeemItems = () => {
    dispatch({ type: 'REDEEM_ITEMS' });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#EFE3C2] to-[#85A947] overflow-hidden">
      <Navbar/>

      <div className="p-6 mt-20 h-[calc(100vh-72px)] overflow-auto">

        <AnimatePresence mode="wait">
          {activeSection === 'products' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[#3E7B27] font-semibold">{product.price} Points</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product)}
                        className="bg-[#3E7B27] text-white px-4 py-2 rounded-full hover:bg-[#123524] transition"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === 'cart' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {state.cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-lg p-4 flex justify-between items-center shadow-md"
                >
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-[#3E7B27]">{item.price} Points</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                  >
                    Remove
                  </motion.button>
                </motion.div>
              ))}
              {state.cart.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end space-x-4 mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={redeemItems}
                    className="bg-[#3E7B27] text-white px-6 py-3 rounded-full hover:bg-[#123524] transition"
                  >
                    Redeem Items
                  </motion.button>
                </motion.div>
              )}
              {state.cart.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  Your cart is empty
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SustainableMarketplace;