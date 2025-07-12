import React from "react"
import { BsStarFill } from "react-icons/bs"
const Experts = () => {

  const array = [
    {
      img:"https://s3-alpha-sig.figma.com/img/5af8/78e5/09217e175d69b8cfd3da49cb2a8a6437?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aThGT6X-pORybQWcBeE7-oXEvJ-Ey41vxaJEbYC5x0RpIwPk2t7IX5tqrdWOh1Rk3EtS2yHGIAqX0uhWIST~4ldJjf1GGSB7VBkPf~1QFL7Pz7Bu2fZFVBSlwyhK48cMSoIftI3gnBTEFOgqIc08H~Y5uCui~aGYtAP0Efi05fxiJ-5xZu~NSFVvgF4oONJNUvOiokHqHn9Tc7G0FutOuULrqp1fq9FwJun3vQaKLKL2KgfPMzp1ruFxGw-ZAMH5Lih5lJewq5DyNXZ1Kt3mUn6p8eBWc1JeJudEXo0Z6qkAIC4l2WK15oaxThlkjFG8V4mnAg1-gk9uZRIIgUeqbA__",  
      name:"Khushi hakke",
      rating:"5",
      tagLine:"Ayurveda Practitioner",
      experience:"25 years of experience",
      work:"Skin Specalist"
    },
    {
      img:"https://s3-alpha-sig.figma.com/img/5af8/78e5/09217e175d69b8cfd3da49cb2a8a6437?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aThGT6X-pORybQWcBeE7-oXEvJ-Ey41vxaJEbYC5x0RpIwPk2t7IX5tqrdWOh1Rk3EtS2yHGIAqX0uhWIST~4ldJjf1GGSB7VBkPf~1QFL7Pz7Bu2fZFVBSlwyhK48cMSoIftI3gnBTEFOgqIc08H~Y5uCui~aGYtAP0Efi05fxiJ-5xZu~NSFVvgF4oONJNUvOiokHqHn9Tc7G0FutOuULrqp1fq9FwJun3vQaKLKL2KgfPMzp1ruFxGw-ZAMH5Lih5lJewq5DyNXZ1Kt3mUn6p8eBWc1JeJudEXo0Z6qkAIC4l2WK15oaxThlkjFG8V4mnAg1-gk9uZRIIgUeqbA__",  
      name:"Avishkar Bhonkar",
      rating:"5",
      tagLine:"Ayurveda Practitioner",
      experience:"25 years of experience",
      work:"skin specalist"
    },
    {
      img:"https://s3-alpha-sig.figma.com/img/5af8/78e5/09217e175d69b8cfd3da49cb2a8a6437?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aThGT6X-pORybQWcBeE7-oXEvJ-Ey41vxaJEbYC5x0RpIwPk2t7IX5tqrdWOh1Rk3EtS2yHGIAqX0uhWIST~4ldJjf1GGSB7VBkPf~1QFL7Pz7Bu2fZFVBSlwyhK48cMSoIftI3gnBTEFOgqIc08H~Y5uCui~aGYtAP0Efi05fxiJ-5xZu~NSFVvgF4oONJNUvOiokHqHn9Tc7G0FutOuULrqp1fq9FwJun3vQaKLKL2KgfPMzp1ruFxGw-ZAMH5Lih5lJewq5DyNXZ1Kt3mUn6p8eBWc1JeJudEXo0Z6qkAIC4l2WK15oaxThlkjFG8V4mnAg1-gk9uZRIIgUeqbA__",  
      name:"Onkar vale",
      rating:"5",
      tagLine:"Ayurveda Practitioner",
      experience:"25 years of experience",
      work:"skin specalist"
    },
  
  ]

  return (
    <main className="flex flex-col justify-center items-center gap-y-4 p-8 ">
       <div className='header-section'>
            <p className='heading'>Meet our Ayurveda experts</p>
        </div>

      <div className=" w-full sm:flex justify-center items-center gap-8 ">
       {
        array.map((item, ind)=>(
          <div key={ind}  className=" hover:scale-110 bg-[#FFF7E2] rounded-3xl overflow-hidden flex flex-col justify-center items-center mb-8 shadow-xl transition-all cursor-pointer">
          <div className=" relative overflow-hidden top-6 gap-2">
            <img loading="lazy" src={item.img} alt="img" 
             className="rounded-full w-32 h-32 object-cover"
            />
            <p className=" absolute bottom-1 text-center px-4 bg-black text-white rounded-2xl left-10  text-sm flex justify-center items-center py-1 gap-1">{item.rating} <BsStarFill className=" text-yellow-400"/></p>
          </div>
          <div className="flex flex-col px-10 pt-8 text-center text-sm gap-y-2">
            <p className=" font-bold text-base">{item.name}</p>
            <p className=" text-sm tracking-wider text-gray-400">{item.tagLine}</p>
            <p className=" text-sm">{item.experience}</p>
            <p className=" rounded-2xl bg-[#3A643B1F] text-sm px-2 py-1 my-2 text-green-800">{item.work}</p>
          </div>
          <div className=" w-full bg-[#3A643B] p-2">
            <p className=" text-center font-medium text-white"></p>
          </div>
        </div>
        ))
       }
        
      </div>
      <button className=" px-5 py-3 border-2 rounded-3xl border-green-700"> Meet Out Experts</button>
    </main>
  )
}

export default Experts
