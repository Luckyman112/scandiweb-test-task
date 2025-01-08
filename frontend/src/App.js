import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import './styles/global.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div>
      <Header />
      <main className="container">
        <CategoriesList />
        <ProductsList addToCart={addToCart} />
        <Cart cartItems={cartItems} onRemove={removeFromCart} onClear={clearCart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;


