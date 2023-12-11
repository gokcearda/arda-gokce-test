import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import './ProductSlider.css'; 

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

  const colors = ['Y', 'R', 'W']; // Renk seçenekleri

  const [activeProductIndexes, setActiveProductIndexes] = useState(Array(products.length).fill(0));
  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView());

  function calculateSlidesPerView() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      return 4;
    } else if (screenWidth >= 992) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    setSlidesPerView(calculateSlidesPerView());
  }, []);

  const handleProductButtonClick = (productIndex) => {
    setActiveProductIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[productIndex] = 0;
      return newIndexes;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleColorButtonClick = (colorIndex, productIndex) => {
    setActiveProductIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[productIndex] = colorIndex;
      return newIndexes;
    });
  };

  return (
    <div>
        <div className="icons-container">
        <img src="images/Svg/Union.svg" alt="Icon 1" className="icon" />
        <img src="images/Svg/solar_wallet-money-linear.svg" alt="Icon 2" className="icon" />
      </div>


      <h1 className="store-title">My Jewellery Store</h1>
      <h2 className="section-title">Moissanite Engagement Rings</h2>

      

      <Swiper
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={slidesPerView}
        loop={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {products.map((product, productIndex) => (
          <SwiperSlide key={product.id}>
            <div className="product-slide">
              <img
                src={`images/Products/${product.name}/${product.name}-${colors[activeProductIndexes[productIndex]]}.jpg`}
                alt={`${product.name}-${colors[activeProductIndexes[productIndex]]}`}
                className="product-image"
              />
      <h3 className="product-name">{`Engagement Ring ${product.id}`}</h3>
              <p className='product-price'>Fiyat: ${product.price}</p>
              <div className="color-buttons-container">
                {colors.map((color, index) => (
                  <button
                    key={color}
                    className={`color-button product-buttons ${color} ${index === activeProductIndexes[productIndex] ? 'active' : ''}`}
                    onClick={() => handleColorButtonClick(index, productIndex)}
                  >
                    <span className={`dot ${color} ${index === activeProductIndexes[productIndex] ? 'active' : ''}`}></span>
                  </button>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="button-container">
        <button className="view-all-button">
          <img src="images/Svg/Group 2.svg" alt="View All Icon" className="icon" />
          VIEW ALL PRODUCTS
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
