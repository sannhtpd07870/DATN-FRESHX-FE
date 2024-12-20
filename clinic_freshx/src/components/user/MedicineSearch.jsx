import React from 'react';

const MedicineSearch = () => {
  return (
    <div className="medicine-search">
      <h2 className="medicine-search__title">Tra cứu tên thuốc</h2>
      <form action="" className="medicine-search__form">
        <input
          placeholder="Nhập tên thuốc cần tìm..."
          type="search"
          className="medicine-search__input"
        />
        <img src="./assets/icons/Search-blue.svg" alt="Search icon" />
      </form>
    </div>
  );
};

export default MedicineSearch;
