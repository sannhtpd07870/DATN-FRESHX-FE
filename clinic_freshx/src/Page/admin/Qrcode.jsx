import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [data, setData] = useState("No result");
  const [isScanning, setIsScanning] = useState(true);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [qrDetected, setQrDetected] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      setCameraDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });
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
          } else {
            setQrDetected(false);
          }
        }
      };

      const interval = setInterval(scanQRCode, 200);
      return () => clearInterval(interval);
    }
  }, [isScanning, qrDetected]);

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

      <p>Scanned Data: {data}</p>

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
  );
};

export default QRCodeScanner;