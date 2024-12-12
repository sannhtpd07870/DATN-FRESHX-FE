import React from 'react';

const Blog = ({ data }) => {
    return (
        <div className="blog">
            <section className="blog-content">
                <h2 className="heading2 heading2--mid">
                    Cùng chúng tôi tạo ra sức khỏe
                </h2>
                <p className="desc1 desc1--mid">
                    Chúng tôi cung cấp tài nguyên và kết nối mà bạn cần
                    để phát triển. Hãy cùng chúng tôi tạo ra tương lai
                    lành mạnh hơn.
                </p>
            </section>

            <div id="blog" className="blog-container">
                {data.blog.map((blogItem, index) => (
                    <article key={index} className="blog-container__item">
                        {index !== 1 ? (
                            <img src={blogItem.image} alt="" className="blog-container__thumb" />
                        ) : null}
                        <section className="blog-container__content">
                            <h3 className="heading4">{blogItem.title}</h3>
                            <p className="blog-container__desc desc2">{blogItem.desc}</p>
                            <button className="btn blog-container__btn">Tìm hiểu thêm</button>
                        </section>
                        {index === 1 ? (
                            <img src={blogItem.image} alt="" className="blog-container__thumb" />
                        ) : null}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Blog;
