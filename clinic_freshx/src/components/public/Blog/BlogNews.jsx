import React from 'react';

const BlogNews = () => {
  return (
    <div className="new-page">
      <h2 className="heading2">Tin tức mới nhất</h2>
      <div className="new-page__container">
        <div className="row">
          <article className="col-6">
            <NewsItem
              image="./assets/img/blog/blog4.png"
              title="Trung đẹp trai - Viện trưởng Viện nghiên cứu Tế bào bào gốc & Công nghệ gen nhận giải thưởng Nikkey Châu Á"
              desc="Trong chương trình giao lưu nghệ thuật tối 21/12 do Quỹ Hỗ trợ bệnh nhân ung thư - Ngày mai Tươi sáng (Bộ Y tế) tổ chức, Vinmec đã vinh dự được trao Bằng khen của Bộ trưởng Bộ Y tế vì có đóng góp tích cực cho cộng đồng năm 2017."
              link="#!"
              large
            />
          </article>
          <article className="col-3">
            <NewsItem
              image="./assets/img/blog/blog5.png"
              title="Fresh-X nhận bằng khen của Bộ Y tế vì đóng góp tích cực cho cộng đồng"
              desc="Trong chương trình giao lưu nghệ thuật tối 21/12 do Quỹ Hỗ trợ bệnh nhân ung thư - Ngày mai Tươi sáng (Bộ Y tế) tổ chức, Vinmec đã vinh dự được trao Bằng khen của Bộ trưởng Bộ Y tế vì có đóng góp tích cực cho cộng đồng năm 2017."
              link="#!"
            />
          </article>
          <article className="col-3">
            <NewsItem
              image="./assets/img/blog/blog6.png"
              title="Fresh-X đạt giải thưởng “Chuỗi phòng phòng khám tiến bộ nhất” của hiệp hội Quản lý Bệnh viện châu Á"
              desc="Trong chương trình giao lưu nghệ thuật tối 21/12 do Quỹ Hỗ trợ bệnh nhân ung thư - Ngày mai Tươi sáng (Bộ Y tế) tổ chức, Vinmec đã vinh dự được trao Bằng khen của Bộ trưởng Bộ Y tế vì có đóng góp tích cực cho cộng đồng năm 2017."
              link="#!"
            />
          </article>
        </div>
      </div>
    </div>
  );
};

const NewsItem = ({ image, title, desc, link, large }) => {
  return (
    <div className={`new-page__item ${large ? 'new-page__item--large' : ''}`}>
      {large && <img src={image} alt="" className="new-page__img new-page__img--large" />}
      <section className={`new-page__content ${large ? 'new-page__content--large' : ''}`}>
        <h3 className="new-page__title">{title}</h3>
        <p className={`new-page__desc ${large ? 'new-page__desc--large' : ''} desc2`}>{desc}</p>
        <a href={link} className={`new-page__link ${large ? 'new-page__link--large' : ''} button-small`}>Xem thêm</a>
      </section>
      {!large && <img src={image} alt="" className="new-page__img" />}
    </div>
  );
};

export default BlogNews;