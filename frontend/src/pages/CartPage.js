import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

function CartPage() {
  return (
    <div>
      <Header />
      <main>
        <Cart />
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
