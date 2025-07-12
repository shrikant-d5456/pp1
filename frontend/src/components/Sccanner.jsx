import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const navigate = useNavigate();
  const [scan, setScsn] =useState(true);

  const handleClick = () => {
    navigate('/scan-img');
    setScsn(false);
  };

  useEffect(()=>{
    setScsn(true);
  },[])

  return (
    
    <>
    {scan && 
      <div
      className='fixed bottom-5 right-5 z-50 p-2 bg-white rounded-full hover:scale-105  transition-transform'
      title='Scan Image'
      aria-label='Scan Image Button'
      onClick={handleClick}
    >
      <div className='bg-white text-green-500 hover:border-green-500  hover:text-black p-4 text-3xl rounded-full border-dashed border-2 border-black'>
       
       <div className=' scale-150'>
        <img loading="lazy" src="https://play-lh.googleusercontent.com/MzmMmuM1xws9TplGMmIWP-QMJQkmUDikU0-x6nshmOeQZpskh3IUZWzTB3Frvd1l-go" alt="" 
       className=' w-4 scale-150 rounded-full '
       />
       </div>

      </div>
    </div>
  }
    </>
  );
};

export default Scanner;
