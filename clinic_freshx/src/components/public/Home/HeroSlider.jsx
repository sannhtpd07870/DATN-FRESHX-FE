import React, { useState, useEffect, useRef } from 'react';
import HomeData from '../../../assets/datajson/Homedata.json'
const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = HomeData.heroItems.images;
  const wrapImgRef = useRef(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Half of the transition time
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [images.length]);

  const showSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className="hero">
      <div 
        className={`hero__wrap-img ${isTransitioning ? 'transitioning' : ''}`}
        ref={wrapImgRef}
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.5s ease-in-out'
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="hero__img"
          />
        ))}
      </div>
      <div className="container">
        <div className="hero__inner">
          <section className="hero-content">
            <h1 className="heading1 hero-content__title">
              {images[currentIndex].title.split('<br />').map((text, index) => (
                <React.Fragment key={index}>
                  {text}
                  {index < images[currentIndex].title.split('<br />').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="desc1">
              {images[currentIndex].description}
            </p>
            <button className="hero-content__btn btn">
              Xem Thêm
            </button>
          </section>
          <div className="container">
            <div className="hero-containers">
              {HomeData.heroItems.heroContainers.map((container, index) => (
                container.type === 'modal' ? (
                  <article 
                    key={index}
                    data-target={container.target}
                    className="open-modal hero-container"
                  >
                    <div className="hero-container__item">
                      <img
                        src={container.icon}
                        alt=""
                        className="hero-container__icon"
                      />
                      <section className="hero-container__content">
                        <h3 className="hero-container__title button-large">
                          {container.title}
                        </h3>
                        <p className="hero-container__desc desc2">
                          {container.description}
                        </p>
                      </section>
                    </div>
                  </article>
                ) : (
                  <article key={index} className="hero-container">
                    <a 
                      href={container.href}
                      className="hero-container__item"
                    >
                      <img
                        src={container.icon}
                        alt=""
                        className="hero-container__icon"
                      />
                      <section className="hero-container__content">
                        <h3 className="hero-container__title button-large">
                          {container.title}
                        </h3>
                        <p className="hero-container__desc desc2">
                          {container.description}
                        </p>
                      </section>
                    </a>
                  </article>
                )
              ))}
            </div>
          </div>
          
          <div className="hero__dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`hero__dot ${index === currentIndex ? 'hero__dot--active' : ''}`}
                onClick={() => showSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;