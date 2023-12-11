import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

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
  const [slidesPerView, setSlidesPerView] = useState(calculateSlidesPerView());

  // slidesPerView değerini belirlemek için bir fonksiyon
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

  // calculateSlidesPerView fonksiyonunu useEffect içinde çağırın
  useEffect(() => {
    setSlidesPerView(calculateSlidesPerView());
  }, []);

  const handleProductButtonClick = (productIndex) => {
    setActiveProductIndex(productIndex);
  };

  useEffect(() => {
    // pencere boyutu değiştikçe slidesPerView değerini güncelle
    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView());
    };

    // pencere boyutu değiştiğinde event listener'ı ekle
    window.addEventListener('resize', handleResize);

    // component unmount olduğunda event listener'ı kaldır
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={slidesPerView} // slidesPerView değerini state'ten alın
      loop={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
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
              {colors.map((colorProduct, index) => (
                <button
                  key={colorProduct}
                  className={`product-button ${colorProduct === colors[activeProductIndex] ? 'active' : ''}`}
                  onClick={() => handleProductButtonClick(index)}
                >
                  {colorProduct}
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
