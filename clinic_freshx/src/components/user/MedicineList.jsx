import React from 'react';

const MedicineList = () => {
  return (
    <div className="medicine">
      <h2 className="medicine__title heading2">Danh sách thuốc</h2>

      <div className="medicine-alphabet">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter, index) => (
          <p
            key={index}
            className={`medicine-alphabet__item ${index === 0 ? 'medicine-alphabet__item--active' : ''}`}
          >
            {letter}
          </p>
        ))}
      </div>

      <div className="medicine-list">
        <div id="medicine-list" className="medicine-list__wrap"></div>

        <div className="medicine-list__pagination">
          <img
            src="./assets/icons/arrow-left.svg"
            alt="Arrow left"
            className="medicine-list__icon"
          />
          <button className="medicine-list__num medicine-list__num--active button-small">1</button>
          <button className="medicine-list__num button-small">2</button>
          <button className="medicine-list__num button-small">3</button>
          <img
            src="./assets/icons/arrow-right.svg"
            alt="Arrow right"
            className="medicine-list__icon"
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
