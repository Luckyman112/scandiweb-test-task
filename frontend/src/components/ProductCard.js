import React from 'react';
import { theme } from '../styles/theme'; // Импортируйте файл theme.js

function ProductCard({ product }) {
  return (
    <div style={{
      border: `1px solid ${theme.colors.secondary}`,
      borderRadius: '8px',
      padding: theme.spacing.medium,
      marginBottom: theme.spacing.medium,
      backgroundColor: theme.colors.secondary,
    }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: theme.colors.text,
      }}>
        {product.name}
      </h2>
      <p style={{
        fontSize: '16px',
        color: theme.colors.primary,
      }}>
        Price: ${product.price}
      </p>
    </div>
  );
}

export default ProductCard;

