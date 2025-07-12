import React, { useState, useRef } from 'react';
import { BsCameraVideo, BsImage, BsUpload, BsQrCodeScan } from 'react-icons/bs';
import Webcam from 'react-webcam';

const ScannerPage = () => {
  const [mode, setMode] = useState(null); // 'upload' | 'camera'
  const [imageSrc, setImageSrc] = useState(null);
  const [scanInfo, setScanInfo] = useState(null);
  const webcamRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImageSrc(imgURL);
      setScanInfo("Scanned info from uploaded image...");
    }
  };

  const captureFromCamera = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setScanInfo("Scanned info from captured image...");
  };

  return (
    <div className='w-full h-[100vh] overflow-scroll  text-white flex flex-col items-center justify-center p-4'>
      <div className='border-2  border-black border-dashed p-8 bg-white w-full max-w-3xl text-center'>
        <h1 className='text-4xl font-bold text-black mb-2'>AayurMedGuide Image Scanner</h1>
        <p className='text-lg text-gray-600 mb-6'>
          Upload or capture an image to scan for health-related information and insights.
        </p>
        <h2 className='text-2xl mb-4 font-semibold flex text-black items-center justify-center gap-2'>
          <BsQrCodeScan className="text-green-400" /> Start Scanning
        </h2>
        <div className='flex gap-4 mb-4 justify-center items-center '>
          <button
            onClick={() => setMode('upload')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2'
          >
            <BsImage /> Upload Image
          </button>
          <button
            onClick={() => setMode('camera')}
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2'
          >
            <BsCameraVideo /> Use Camera
          </button>
        </div>


      </div>

      {mode === 'upload' && (
        <div className='mb-6'>
          <label className='flex flex-col items-center cursor-pointer bg-green-500 border-2 border-dashed border-white p-6 rounded-lg'>
            <BsUpload className='text-4xl mb-2' />
            <span className='mb-2'>Click to upload an image</span>
            <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' />
          </label>
        </div>
      )}

      {mode === 'camera' && (
        <div className='flex flex-col items-center'>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            className='w-full max-w-md rounded shadow-md mb-4'
          />
          <button
            onClick={captureFromCamera}
            className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded'
          >
            Capture & Scan
          </button>
        </div>
      )}

      {imageSrc && (
        <div className='mt-8 text-center'>
          <h2 className='text-xl font-semibold mb-4'>Scanned Image:</h2>
          <img loading="lazy" src={imageSrc} alt='Scanned' className='max-w-md rounded shadow-lg mb-4' />
          <p className='bg-slate-700 p-4 rounded text-green-300'>
            {scanInfo}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScannerPage;
