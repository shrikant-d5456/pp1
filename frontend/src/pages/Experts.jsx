import React from "react";
import { BsStarFill } from "react-icons/bs";
import doctor1 from "../../assets/doctor1.jpeg";
import doctor2 from "../../assets/doctor2.jpeg";
import doctor3 from "../../assets/doctor3.jpeg";
import certificate1 from "../../assets/doctor1certi.jpeg";
import certificate2 from "../../assets/doctor2certi.jpeg";
import certificate3 from "../../assets/doctor3certi.jpeg";

const Experts = () => {
  const array = [
    {
      img: doctor1,
      name: "Dr. Vishvnath Bapat",
      rating: "5",
      tagLine: "Ayurveda Practitioner",
      experience: "15 years of experience",
      work: "Skin Specialist",
    },
    {
      img: doctor2,
      name: "Dr. Sachin Shet",
      rating: "5",
      tagLine: "Ayurveda Expert",
      experience: "10 years of experience",
      work: "Digestive Health",
    },
    {
      img: doctor3,
      name: "Dr. Sharayu Penkar",
      rating: "5",
      tagLine: "Ayurveda Consultant",
      experience: "5 years of experience",
      work: "Women's Wellness",
    },
  ];

  const certificates = [
    {
     certificate:certificate1,
    },
    {
     certificate:certificate2,
    },
    {
     certificate:certificate3,
    },
    
  ];

  return (
    <main className="flex flex-col justify-center items-center gap-y-12 p-8">
      {/* Experts Section */}
      <div className="w-full text-center mb-4">
        <p className="text-3xl font-bold">Meet our Ayurveda Experts</p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-8">
        {array.map((item, ind) => (
          <div
            key={ind}
            className="hover:scale-105 bg-white rounded-3xl overflow-hidden flex flex-col items-center w-72 shadow-xl transition-transform duration-300 cursor-pointer border-4 border-white"
          >
            <div className="relative w-full overflow-hidden m-auto py-8 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-[#2bff00] via-[#fffffffa] to-[#40ff00]">
              <img
                loading="lazy"
                src={item.img}
                alt="Expert"
                className="w-[100px] h-[100px] rounded-full object-cover m-auto border-4 border-white"
              />
              <p className="absolute bottom-2 right-4 bg-green-800 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                {item.rating} <BsStarFill className="text-yellow-400" />
              </p>
            </div>

            <div className="flex flex-col px-6 pt-4 pb-6 text-center text-sm gap-y-1 ">
              <p className="font-bold text-lg ">{item.name}</p>
              <p className="text-sm text-gray-500 font-semibold">{item.tagLine}</p>
              <p className="text-sm text-gray-800">{item.experience}</p>
              <p className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mt-2">
                {item.work}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Section */}
      <div className="w-full  py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Expert Certificates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className=" shadow-md border-double border-8 border-orange-200  overflow-hidden "
            >
              <img src={cert.certificate} alt="certificate" className=" w-full h-full " />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Experts;