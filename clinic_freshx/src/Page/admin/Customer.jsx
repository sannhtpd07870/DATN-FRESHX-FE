import React from 'react';
import './CustomerRequest.css';

const requests = [
  { name: "Hoang Bao Trung", gender: "Male", phone: "0823240040", email: "trunghoang.240500@gmail.com", date: "20/11/2024" },
  { name: "Hoang Bao Trung", gender: "Male", phone: "0823240040", email: "trunghoang.240500@gmail.com", date: "20/11/2024" }
];

const CustomerRequest = () => {
  const handleDelete = (index) => {
    console.log("Delete request at index:", index);
  };

  return (
    <div className='content'>
      <h1>Yêu cầu của khách hàng</h1>
      <table>
        <thead>
          <tr>
            <th>Họ và Tên</th>
            <th>Giới tính</th>
            <th>Sđt</th>
            <th>Email</th>
            <th>Ngày hẹn</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.name}</td>
              <td>{request.gender}</td>
              <td>{request.phone}</td>
              <td>{request.email}</td>
              <td>{request.date}</td>
              <td>
                <i 
                  className="fas fa-trash-alt" 
                  onClick={() => handleDelete(index)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="request">
        Yêu cầu: “Tôi muốn làm sản phẩm ERP bạn có thể tư vấn cho tôi được không ?”
      </div>
    </div>
  );
};

export default CustomerRequest;
