import React from 'react';

const BlogPage = () => {
  const blogButtons = [
    { text: "Dinh dưỡng", active: true },
    { text: "Sức khỏe", active: false },
    { text: "Thể dục", active: false },
    { text: "Triệu chứng bệnh", active: false }
  ];

  const paginationNumbers = [1, 2, 3];

  return (
    <div className="blog-page">
      <h2 className="heading2">Bài viết mới nhất</h2>
      <div className="blog-page__wrap">
        {blogButtons.map((btn, index) => (
          <p key={index} className={`blog-page__btn ${btn.active ? 'blog-page__btn--active' : ''} button-large`}>
            {btn.text}
          </p>
        ))}
      </div>

      <div id="new" className="new-container"></div>

      <div className="medicine-list__pagination">
        <img src="./assets/icons/arrow-left.svg" alt="" className="medicine-list__icon" />
        {paginationNumbers.map(num => (
          <button key={num} className={`medicine-list__num ${num === 1 ? 'medicine-list__num--active' : ''} button-small`}>
            {num}
          </button>
        ))}
        <img src="./assets/icons/arrow-right.svg" alt="" className="medicine-list__icon" />
      </div>
    </div>
  );
};
export default BlogPage;