import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// Tüm Swiper modüllerini etkinleştirin
import 'swiper/swiper-bundle.css';

const ProductSlider = () => {
  const products = [
    { id: 1, name: 'EG009', price: 19.99 },
    { id: 2, name: 'EG020', price: 19.99 },
    { id: 3, name: 'EG012', price: 19.99 },
    { id: 4, name: 'EG022', price: 19.99 },
    { id: 5, name: 'EG074', price: 19.99 },
    { id: 6, name: 'EG075', price: 19.99 },
    { id: 7, name: 'EG094', price: 19.99 },
    { id: 8, name: 'EG115', price: 19.99 },

  ];

  const colors = ['W', 'R', 'Y']; // Renk seçenekleri

  const [activeProductIndex, setActiveProductIndex] = useState(0);

  const handleProductButtonClick = (index) => {
    setActiveProductIndex(index);
  };

  return (
    <Swiper
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={4}
      loop={true}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <div className="product-slide">
            <img
              src={`images/Products/${product.name}/${product.name}-${colors[activeProductIndex]}.jpg`}
              alt={`${product.name}-${colors[activeProductIndex]}`}
            />
            <h3>{product.name}</h3>
            <p>Fiyat: ${product.price}</p>
            <div className="product-buttons">
              {colors.map((color, index) => (
                <button
                  key={color}
                  className={`product-button ${index === activeProductIndex ? 'active' : ''}`}
                  onClick={() => handleProductButtonClick(index)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
