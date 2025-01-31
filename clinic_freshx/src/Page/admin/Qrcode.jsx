import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";
import { isArrayBuffer } from "@microsoft/signalr/dist/esm/Utils";
import "./Qr.css"

const Cccd = ({ onDataScanned }) => {

  if (onDataScanned == "No result") {
    return (<></>)
  }
  // Tách dữ liệu từ scannedData
  const [id, no, fullName, dob, gender, address, issueDate] = onDataScanned.split("|");

// Hàm chuyển đổi ngày từ ddMMyyyy sang yyyy-MM-dd
const formatDate = (dateStr) => {
  const day = dateStr.slice(0, 2);
  const month = dateStr.slice(2, 4);
  const year = dateStr.slice(4, 8);
  return `${day}-${month}-${year}`;
};

// Tạo JSON với ngày được định dạng lại
const jsonData = {
  id,
  fullName,
  dob: formatDate(dob),
  gender,
  address,
  issueDate: formatDate(issueDate),
};
  return (
    <div className="Cccd">
    <div className="card">
      <img alt="Vietnam national emblem" src="../../../public/assets/img/Quoc_Huy_Viet_Nam.png" />
      <div className="left-fields">
        <div>
          <div className="title">Số CCCD</div>
          <div className="value">{jsonData.id}</div>
        </div>
        <div>
          <div className="title">Họ và tên</div>
          <div className="value">{jsonData.fullName}</div>
        </div>
        <div className="gender-dob">
          <div>
            <div className="title">Giới tính</div>
            <div className="value">{jsonData.gender}</div>
          </div>
          <div>
            <div className="title">Ngày sinh</div>
            <div className="value">{jsonData.dob}</div>
          </div>
        </div>
        <div>
          <div className="title">Nơi thường trú</div>
          <div className="value">{jsonData.address}</div>
        </div>
        <div>
          <div className="title">Ngày cấp CCCD</div>
          <div className="value">{jsonData.issueDate}</div>
        </div>
      </div>
    </div>
  </div>
  
  );
};


const QRCodeScanner = ({ onDataScanned }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [data, setData] = useState("No result");
  const [isScanning, setIsScanning] = useState(true);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [qrDetected, setQrDetected] = useState(false);
  // Tách dữ liệu từ scannedData

  useEffect(() => {
    const checkCameraAccess = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        setCameraDevices(videoDevices);

        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        } else {
          alert("No camera devices found. Please connect a camera and refresh the page.");
        }
      } catch (err) {
        console.error("Error accessing devices: ", err);
        alert("Unable to access camera. Please grant permissions and refresh the page.");
      }
    };

    checkCameraAccess();
  }, []);


  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    if (selectedDeviceId) {
      startVideo();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [selectedDeviceId]);

  useEffect(() => {
    if (isScanning) {
      const scanQRCode = () => {
        if (canvasRef.current && videoRef.current) {
          const canvas = canvasRef.current;
          const video = videoRef.current;
          const context = canvas.getContext("2d");

          if (video.videoWidth === 0 || video.videoHeight === 0) {
            // console.warn("Video dimensions are not available yet.");
            return;
          }

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Draw the guide frame
          drawGuideFrame(context, canvas.width, canvas.height, qrDetected);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            setQrDetected(true);
            setData(code.data);
            setIsScanning(false);

            if (onDataScanned) {
              onDataScanned(code.data);
            }
          } else {
            setQrDetected(false);
          }
        }
      };


      const interval = setInterval(scanQRCode, 200);
      return () => clearInterval(interval);
    }
  }, [isScanning, qrDetected, onDataScanned]);

  const drawGuideFrame = (context, width, height, isDetected) => {
    // Calculate center frame dimensions
    const frameSize = Math.min(width, height) * 0.6;
    const x = (width - frameSize) / 2;
    const y = (height - frameSize) / 2;

    // Set colors based on QR detection
    const frameColor = isDetected ? "#00FF00" : "#FF0000";
    const cornerSize = 30;
    const lineWidth = 10;

    context.strokeStyle = frameColor;
    context.lineWidth = lineWidth;

    // Draw corners
    // Top Left
    context.beginPath();
    context.moveTo(x, y + cornerSize);
    context.lineTo(x, y);
    context.lineTo(x + cornerSize, y);
    context.stroke();

    // Top Right
    context.beginPath();
    context.moveTo(x + frameSize - cornerSize, y);
    context.lineTo(x + frameSize, y);
    context.lineTo(x + frameSize, y + cornerSize);
    context.stroke();

    // Bottom Right
    context.beginPath();
    context.moveTo(x + frameSize, y + frameSize - cornerSize);
    context.lineTo(x + frameSize, y + frameSize);
    context.lineTo(x + frameSize - cornerSize, y + frameSize);
    context.stroke();

    // Bottom Left
    context.beginPath();
    context.moveTo(x + cornerSize, y + frameSize);
    context.lineTo(x, y + frameSize);
    context.lineTo(x, y + frameSize - cornerSize);
    context.stroke();
  };

  const handleRestart = () => {
    setData("No result");
    setIsScanning(true);
    setQrDetected(false);
  };

  return (
    <div style={{display: "flex"}}>
    <div style={{ textAlign: "center" }}>
      <h2>QR Code Scanner</h2>
      <div style={{ position: "relative", width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        <video
          ref={videoRef}
          style={{ width: "100%", maxWidth: "400px" }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "400px",
            height: "100%"
          }}
        ></canvas>
      </div>
      {cameraDevices.length > 0 && (
        <select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          style={{ marginTop: "10px" }}
        >
          {cameraDevices.map((device) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${cameraDevices.indexOf(device) + 1}`}
            </option>
          ))}
        </select>
      )}

      {!isScanning && (
        <button onClick={handleRestart} style={{ marginTop: "10px" }}>
          Restart Scanner
        </button>
      )}
    </div>
    <Cccd onDataScanned={data} />
    </div>
  );
};

export default QRCodeScanner;