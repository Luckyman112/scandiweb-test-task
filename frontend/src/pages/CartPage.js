import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart'; // Ensure this points to the right file path

function CartPage() {
  return (
    <div>
      <Header />
      <main>
        <h2>Shopping Cart</h2>
        <Cart />
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
