import React from 'react';

function CategoriesList() {
  const categories = ['all', 'clothes', 'tech'];

  return (
    <div className="categories-list">
      {categories.map((category, index) => (
        <button key={index}>{category}</button>
      ))}
    </div>
  );
}

export default CategoriesList;
