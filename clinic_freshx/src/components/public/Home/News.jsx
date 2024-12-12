import React from 'react';

const News = ({ data }) => {
    console.log("new",data)
    return (
        <div className="new">
            <section className="new-content">
                <h2 className="heading2 heading2--mid">
                    Cùng chúng tôi tạo ra sức khỏe
                </h2>
                <p className="desc1 desc1--mid">
                    Cập nhật thông tin mới nhất, lời khuyên của chuyên
                    gia và các mẹo thực tế để giữ cho bạn khỏe mạnh và
                    hạnh phúc
                </p>
            </section>

            <div id="new" className="new-container">
                {data.new.map((newsItem) => (
                    <a key={newsItem.id} href={newsItem.link} className="new-container__item">
                        <div className="new-container__wrap">
                            <img src={newsItem.image} alt="" className="new-container__thumb" />
                            <button className="new-container__btn button-small">Đọc thêm</button>
                        </div>
                        <div className="new-container__tags">
                            {newsItem.tags.map((tag, index) => (
                                <p key={index} className="new-container__tag button-small">{tag}</p>
                            ))}
                        </div>
                        <h3 className="new-container__title heading4">{newsItem.title}</h3>
                        <p className="desc2">{newsItem.desc}</p>
                    </a>
                ))}
            </div>

            <button className="new__btn btn">Xem Thêm</button>
        </div>
    );
};

export default News;
