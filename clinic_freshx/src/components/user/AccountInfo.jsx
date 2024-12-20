import React from 'react';

const AccountInfo = () => {
  return (
    <div className="col-8 col-xl-7 col-lg-6 col-md-12" style={{ height: '263px', width: '870px' }}>
      <div className="cart-info">
        <div className="row gy-3">
          {/* Account info */}
          <div className="col-12">
            <h2 className="cart-info__heading">
              Account info
            </h2>
            <p className="cart-info__desc profile__desc">
              Addresses, contact information and password
            </p>
            <div className="row row-cols-2 row-cols-lg-1 gy-md-2">
              {/* Account info 1 */}
              <div className="col">
                <article className="account-info">
                  <div className="account-info__icon">
                    <img
                      src="./public/assets/icons/mail.svg"
                      alt=""
                      className="icon"
                    />
                  </div>
                  <div>
                    <h3 className="button-small">
                      Địa chỉ email
                    </h3>
                    <p className="account-info__desc">
                      trunghoang@gmail.com
                    </p>
                  </div>
                </article>
              </div>

              {/* Account info 2 */}
              <div className="col">
                <article className="account-info">
                  <div className="account-info__icon">
                    <img
                      src="./public/assets/icons/phone.svg"
                      alt=""
                      className="icon"
                    />
                  </div>
                  <div>
                    <h3 className="button-small">
                      Số điện thoại
                    </h3>
                    <p className="account-info__desc">
                      +84 23240040
                    </p>
                  </div>
                </article>
              </div>

              {/* Account info 3 */}
              <div className="col">
                <article className="account-info">
                  <div className="account-info__icon">
                    <img
                      src="./public/assets/icons/location.svg"
                      alt=""
                      className="icon"
                    />
                  </div>
                  <div>
                    <h3 className="button-small">
                      Địa chỉ nhà ở
                    </h3>
                    <p className="account-info__desc">
                      Đông Hà - Quảng Trị
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
