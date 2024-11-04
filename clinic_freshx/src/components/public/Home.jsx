import React, { useEffect, useState } from 'react'; // Thêm useState và useEffect
import CURDtestfile from '../../data/testfile';
import "./Home.css"
import Loading from '../common/loading'; 

const Home = () => {
  const { getfile } = CURDtestfile();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
      fetchFiles();
  }, []);

  const fetchFiles = async () => {
      const data = await getfile();
      setFiles(data);
      setLoading(false); // Đặt loading thành false sau khi tải xong
  };

  return (
    <div>
      <h1>Trang chủ</h1>
      {loading ? ( // Kiểm tra trạng thái loading
        <Loading /> // Hiển thị component Loading
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tệp</th>
              <th>Ảnh</th>
            </tr>
          </thead>
          <tbody>
            {files && files.map(file => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.fileName}</td>
                <td>
                  <img src={file.urlFile} alt={file.fileName} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
