import React, { useState, useRef, useEffect } from 'react';
import { BsCameraVideo, BsImage, BsUpload, BsQrCodeScan, BsSearch } from 'react-icons/bs';
import Webcam from 'react-webcam';
import axios from 'axios';

const ScannerPage = () => {
  const [mode, setMode] = useState(null); // 'upload' | 'camera'
  const [imageSrc, setImageSrc] = useState(null);
  const [scanInfo, setScanInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  // Upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setImageSrc(imageURL);
    await identifyPlantFromFile(file);
  };

  // Webcam capture handler
  const captureFromCamera = async () => {
    const base64 = webcamRef.current.getScreenshot();
    setImageSrc(base64);
    await identifyPlantFromBase64(base64);
  };

  // API: identify from File object
  const identifyPlantFromFile = async (file) => {
    setLoading(true);
    setScanInfo(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:8000/api/files/identify', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setScanInfo(res.data.result || res.data);
      console.log(res.data.result || res.data)
    } catch (err) {
      setScanInfo('❌ Error identifying plant.');
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // API: identify from base64 image (webcam)
  const identifyPlantFromBase64 = async (base64Image) => {
    setLoading(true);
    setScanInfo(null);

    try {
      const blob = await (await fetch(base64Image)).blob();
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
      await identifyPlantFromFile(file);
    } catch (err) {
      setScanInfo('❌ Error identifying captured image.');
      console.error("Capture error:", err);
    } finally {
      setLoading(false);
    }
  };

  const speak = () => {
    const text = `
      ${scanInfo.common_name}. 
      Scientific name: ${scanInfo.scientific_name}. 
      ${scanInfo.description}. 
      Uses: ${scanInfo.uses?.join(', ')}. 
      Cultivation: ${scanInfo.cultivation}. 
      Cautions: ${scanInfo.cautions?.join(', ')}.
    `;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const resetScan = () => {
    setMode(null);
    setImageSrc(null);
    setScanInfo(null);
  };

  const scrollToTop = useRef();
  useEffect(() => {
    const elementPosition = scrollToTop.current?.getBoundingClientRect().top ?? 0;
    window.scrollTo({
      top: window.pageYOffset + elementPosition - 100,
      behavior: "smooth",
    });
  }, []);

  return (
    <div ref={scrollToTop} className='w-full overflow-scroll text-white flex flex-col items-center justify-center p-4'>
      <div className='border-2 border-black border-dashed p-8 bg-white w-full max-w-3xl text-center'>
        <h1 className='text-4xl font-bold text-black mb-2'>AayurMedGuide Image Scanner</h1>
        <p className='text-lg text-gray-600 mb-6'>
          Upload or capture an image to scan for health-related plant information.
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

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div className='m-6 '>
          <label className=' text-black flex gap-4 text-sm font-bold justify-center items-center cursor-pointer bg-white  border-2 border-dashed border-green-500 p-2 rounded-lg animate-pulse'>
            <BsUpload />
            <span >Click to upload an image</span>
            <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' />
          </label>
        </div>
      )}

      {/* Camera Mode */}
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

      {/* Result Section */}
      {imageSrc && (
        <div className='mt-8 text-center w-full'>
          <h2 className='text-xl font-semibold mb-4  text-black'>Scanned Image:</h2>
          <div className='w-full md:flex justify-center items-center m-auto '>
            <div>
              <img loading="lazy" src={imageSrc} alt='Scanned' className=' relative z-20 lg:max-w-md  shadow-lg border-2 bg-white border-green-500 p-2 ' />
            </div>
            <div className=' w-full relative  md:w-1/4 h-[200px] flex justify-center items-center'>
              <hr className=' absolute w-full top-[50%] border-[1px] border-green-500 rotate-90 md:rotate-0' />
              <span className='bg-white border-2 border-green-500 p-4 rounded-full text-green-500 text-3xl z-10'><BsSearch /></span>
            </div>
            <div className='relative z-20'>
              {loading && (
                <div className="text-green-900 font-semibold ">
                  🌿 Identifying plant <span className='animate-pulse'>...</span>
                </div>
              )}
              {!loading && typeof scanInfo === 'string' && (() => {
                try {
                  // 1. Extract the JSON part from the markdown-style string
                  const jsonText = scanInfo
                    .replace(/^```json/, '')  // remove starting ```
                    .replace(/```$/, '')      // remove ending ```
                    .trim();

                  // 2. Parse the JSON string
                  const data = JSON.parse(jsonText);

                  // 3. Render parsed data
                  return (
                    <div className="bg-white/80 text-black px-8 py-2 shadow-md border-2 border-green-500  text-left max-w-md  mx-auto ">
                      <h2 className="text-2xl font-bold text-green-700 mb-2  flex items-center gap-2">{data.common_name}<p className="italic text-sm text-black font-light mt-1">(<strong>{data.scientific_name}</strong>)</p>
                      </h2>
                      <p className="mb-4 ">{data.description}</p>

                      <div className="mb-4">
                        <h3 className="font-semibold text-lg text-green-600">🌿 Uses:</h3>
                        <ul className="list-disc list-inside text-sm">
                          {data.uses?.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h3 className="font-semibold text-lg text-yellow-600">🌱 Cultivation:</h3>
                        <p className="text-sm">{data.cultivation}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-red-600">⚠️ Cautions:</h3>
                        <ul className="list-disc list-inside text-sm text-red-700">
                          {data.cautions?.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                      </div>
                    </div>
                  );
                } catch (err) {
                  return <p className="text-red-500">⚠️ plant not detected .</p>;
                }
              })()}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ScannerPage;