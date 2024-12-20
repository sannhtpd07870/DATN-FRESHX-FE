import React, { useState } from "react";

const Feedback = ({ feedbacks }) => {
    const [feedbackIndex, setFeedbackIndex] = useState(0);

    // Hàm điều hướng tới feedback tiếp theo
    const showNextFeedback = () => {
        setFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    };

    // Hàm điều hướng tới feedback trước đó
    const showPreviousFeedback = () => {
        setFeedbackIndex(
            (prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length
        );
    };

    const currentFeedback = feedbacks[feedbackIndex];

    return (
        <div className="container">
            <div id="feedback" className="feedback">
                <img
                    src={currentFeedback.image}
                    alt="Feedback"
                    className="feedback__img"
                />
                <section className="feedback-content">
                    <h2 className="heading2">Đánh giá của khách hàng</h2>
                    <blockquote className="feedback-content__quote blog-quote">
                        “{currentFeedback.quote}”
                    </blockquote>
                    <h3 className="feedback-content__name heading5">
                        {currentFeedback.name}
                    </h3>
                    <p className="feedback-content__position desc1">
                        {currentFeedback.position}
                    </p>
                    <div className="feedback-content__wrap">
                        <div className="feedback-content__box">
                            <span className="feedback-content__separate"></span>
                            <span
                                className="feedback-content__separate--short"
                                style={{
                                    left: `${currentFeedback.shortLeft}%`,
                                }}
                            ></span>
                        </div>
                        <div className="feedback-content__action">
                            <div
                                className="feedback-content__left"
                                onClick={showPreviousFeedback}
                            >
                                <svg
                                    className="feedback-content__icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                >
                                    <path
                                        d="M6.63439 0.364401C6.81928 0.364401 7.00418 0.432523 7.15016 0.578496C7.43237 0.860709 7.43237 1.32782 7.15016 1.61004L1.7589 7.0013L7.15016 12.3925C7.43237 12.6748 7.43237 13.1419 7.15016 13.4241C6.86794 13.7063 6.40083 13.7063 6.11862 13.4241L0.211587 7.51707C-0.0706272 7.23485 -0.0706272 6.76774 0.211587 6.48553L6.11862 0.578496C6.26459 0.432523 6.44949 0.364401 6.63439 0.364401Z"
                                        fill="#1E90D2"
                                    />
                                    <path
                                        d="M0.892001 6.27221L17.2701 6.27221C17.6691 6.27221 18 6.60308 18 7.00207C18 7.40106 17.6691 7.73193 17.2701 7.73193L0.892001 7.73193C0.493009 7.73193 0.162137 7.40106 0.162137 7.00207C0.162137 6.60308 0.493009 6.27221 0.892001 6.27221Z"
                                        fill="#1E90D2"
                                    />
                                </svg>
                            </div>
                            <div
                                className="feedback-content__right"
                                onClick={showNextFeedback}
                            >
                                <svg
                                    className="feedback-content__icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="14"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                >
                                    <path
                                        d="M6.63439 0.364401C6.81928 0.364401 7.00418 0.432523 7.15016 0.578496C7.43237 0.860709 7.43237 1.32782 7.15016 1.61004L1.7589 7.0013L7.15016 12.3925C7.43237 12.6748 7.43237 13.1419 7.15016 13.4241C6.86794 13.7063 6.40083 13.7063 6.11862 13.4241L0.211587 7.51707C-0.0706272 7.23485 -0.0706272 6.76774 0.211587 6.48553L6.11862 0.578496C6.26459 0.432523 6.44949 0.364401 6.63439 0.364401Z"
                                        fill="#1E90D2"
                                    />
                                    <path
                                        d="M0.892001 6.27221L17.2701 6.27221C17.6691 6.27221 18 6.60308 18 7.00207C18 7.40106 17.6691 7.73193 17.2701 7.73193L0.892001 7.73193C0.493009 7.73193 0.162137 7.40106 0.162137 7.00207C0.162137 6.60308 0.493009 6.27221 0.892001 6.27221Z"
                                        fill="#1E90D2"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Feedback;
