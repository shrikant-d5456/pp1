import React, { useEffect, useState, useRef } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { BsX } from 'react-icons/bs';
import sound from '../../assets/notification.mp3';
import img1 from '../../assets/img1.jpeg'
import {toast} from 'react-toastify';
const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  const [msg, setMsg] = useState('');
  const [hasShowPopup, setHasShowPopup] = useState(false);


  const [isOpen, setIsOpen] = useState(true);
  const audioRef = useRef(new Audio(sound));

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setMsg("Good Morning 🌅");
    } else if (currentHour < 17) {
      setMsg("Good Afternoon ☀️");
    } else if (currentHour < 21) {
      setMsg("Good Evening 🌇");
    } else {
      setMsg("Good Night 🌙");
    }
    const alreadyShown = sessionStorage.getItem('hasShowPopup');
    if (!alreadyShown) {
      setHasShowPopup(true);
      sessionStorage.setItem('hasShowPopup', true);
    }
    
  }, [isOpen]);

  return (
    <>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={5000}
        bullets={true}
        className='border-8 border-white z-0 w-full lg:h-[700px] md:h-[500px] h-[250px] lg:rounded-2xl overflow-hidden'
      >
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src='https://kairalicenters.com/wp-content/uploads/2022/02/Blog-789x471-1-1.png'
            alt='Ayurveda Blog'
          />
        </div>
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src='https://thumbs.dreamstime.com/b/five-elements-ayurveda-ether-water-wind-fire-earth-circle-border-line-icon-sign-vector-design-206840445.jpg'
            alt='Five Elements Ayurveda'
          />
        </div>
        <div className='w-full h-full'>
          <img
            className='w-full h-full object-cover'
            src={img1}
            alt='Five Elements Ayurveda'
          />
        </div>
      </AutoplaySlider>

      {isOpen && hasShowPopup && (
        <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-start space-x-2 bg-green-50 border border-gray-300 rounded-md p-4 max-w-md shadow-lg'>
          <button
            className='text-gray-500 hover:text-green-700 focus:outline-none'
            onClick={() => setIsOpen(false)}
            aria-label="Close notification"
          >
            <BsX size={24} />
          </button>
          <p className='font-medium text-sm text-gray-700'>
            {msg}
            <br />
            Welcome to{' '}
            <span className='text-green-700 font-semibold'>'AayurMedGuide'</span> — your trusted companion in discovering the healing power of Ayurveda 🌿.
          </p>
        </div>
      )}
    </>
  );
};

export default Slider;