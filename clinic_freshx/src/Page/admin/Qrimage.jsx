import React, { useState, useRef } from "react";
import jsQR from "jsqr";

const QRCodeFromImageJSQR = () => {
  const [qrCodeData, setQRCodeData] = useState(null);
  const canvasRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            setQRCodeData(code.data); // Kết quả mã QR
            console.log(code)
            // Tách dữ liệu bằng dấu "|"
            const [id, citizenId, fullName, dob, gender, address, issueDate] = code.data.split("|");

            // Tạo đối tượng kết quả
            const result = {
            id,
            citizenId,
            fullName,
            dob,
            gender,
            address,
            issueDate,
            };

            console.log(result);
          } else {
            setQRCodeData("Unable to decode QR code");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Scan QR Code from Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {qrCodeData && <p>Scanned Data: {qrCodeData}</p>}
    </div>
  );
};

export default QRCodeFromImageJSQR;
