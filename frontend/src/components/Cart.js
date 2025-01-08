import React, { useState } from 'react';
import './Cart.css';

function Cart({ cartItems, onRemove, onClear }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-quantity">x{item.quantity}</span>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total: </span>
            <strong>${calculateTotal()}</strong>
          </div>
          <button className="cart-clear" onClick={onClear}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
