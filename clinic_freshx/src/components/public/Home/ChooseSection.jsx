import React, { useEffect, useState } from 'react';
import HomeData from '../../../assets/data/Homedata.json'

const ChooseSection = () => {
  const [chooseItems, setChooseItems] = useState([]);

  useEffect(() => {
    // Bạn có thể tải dữ liệu từ JSON file hoặc từ API ở đây
    setChooseItems(HomeData.chooseItems);
  }, []);

  return (
    <div className="container">
      {/* Why choose */}
      <div className="choose">
        <h2 className="heading2 choose__title">
          Tại sao nên chọn Fresh-X
        </h2>

        <div className="choose-container">
          <img
            src="./assets/img/choose/avt.png"
            alt=""
            className="choose-container__img"
          />

          <div className="choose-container__wrap">
            {chooseItems.map((item, index) => (
              <article key={index} className="choose-container__item">
                <img src={item.icon} alt={item.title} />
                <h3 className="choose-container__title heading4">
                  {item.title}
                </h3>
                <p className="choose-container__desc desc1">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSection;
