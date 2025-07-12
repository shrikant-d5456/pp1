import React, { useEffect, useState } from "react";
import { allergy } from "../Data/Allergies";
import { BsArrowDown, BsSearch, BsX } from "react-icons/bs";
import Magic from "../components/Magic";


const Allergies = () => {
  const [category, setCategory] = useState("all");
  const [input, setInput] = useState("");
  const [filteredAllergies, setFilteredAllergies] = useState(allergy);
  const [magic, setMagic] = useState(false);

   const [showOption, setShowOption] = useState(true);


  const symptoms = ["Hives", "Rash", "difficulty breathing", "Stomach cramps", "swelling"];

  const handleSearch = () => {
    setFilteredAllergies(
      allergy.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.description.toLowerCase().includes(input.toLowerCase()) ||
        item.symptoms.some((symptom) => symptom.toLowerCase().includes(input.toLowerCase()))
      )
    );
    setTimeout(() => {
      setMagic(false);
    }, 2000);
    setMagic(true);
  };

  // Update filtered allergies when category changes
  useEffect(() => {
    if (category === "all") {
      setFilteredAllergies(allergy);
    } else {
      setFilteredAllergies(
        allergy.filter((item) => item.symptoms.includes(category))
      );
      setTimeout(() => {
        setMagic(false);
      }, 2000);
      setMagic(true);
    }
  }, [category]);

  return (

    <section className="relative">

      {magic && <Magic />}
      <div className=" fixed top-0 bg-white w-full py-4 mt-24 ">

        {showOption &&
          <div className="w-full flex flex-wrap gap-2 justify-center">
            {symptoms.map((item, index) => (
              <button
                key={index}
                className={`border-[1px] border-green rounded-full px-4 py-1 ${item === category ? "bg-green text-white" : "text-green"
                  }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
            <div>
              <input
                type="text"
                placeholder="Search Diseases"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border-[1px] w-fit text-sm border-gray-300 px-4 py-2 rounded-full"
              />
              <button
                onClick={handleSearch}
                className="bg-green text-white p-3 rounded-full "
              >
                <BsSearch />
              </button>
            </div>
          </div>
        }

        <button
          onClick={() => setShowOption(!showOption)}
          className=" fixed right-1 mt-2 z-50 bg-white p-2  text-xl ">
          {showOption ? <BsX /> : <BsArrowDown />}
        </button>


      </div>


      <div className=" mt-24">

        <p className="text-center sm:my-4 my-8 text-4xl font-bold text-gray-800">
          Allergies
        </p>

        {(category !== "all" || input !== "") && (
          <p className="font-bold uppercase text-green underline ml-8 my-4">
            Filter by {input || category}
          </p>
        )}

        {filteredAllergies.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 sm:w-10/12 m-auto px-2 transition-all">
            <div className="w-full flex-row-reverse sm:flex-row flex gap-2 ">
              <div className="md:w-2/3 w-full border-[1px] border-gray-100 p-4 text-white rounded-3xl shadow-md  bg-gradient-to-r from-green-800 to-green-500">

                <p className=" font-bold my-1"> Name of Disease </p>
                {item.name}
                <hr className=" my-2" /> <p className=" font-bold mb-1">About</p>
                <p>{item.description}</p>

              </div>
              <div className=" md:w-1/3 w-full h-full flex justify-center items-center overflow-hidden border-[1px] border-gray-100 rounded-3xl shadow-md">
                <img
                  className="w-full object-cover hover:scale-110 transition-all rounded-3xl"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMgjaqDfvPS3vJ6rDaL7F6rbsbYBdKjGemvm62znUbLYQ1JL_Y_3ba_B4q5vMhmVvUMBo&usqp=CAU"
                  alt="img"
                />
              </div>
            </div>

            <div className="border-[1px] bg-white border-gray-100 p-4 rounded-3xl shadow-md my-2">
              <p className="font-bold mb-2">Description</p>
              <p>{item.description}</p>
              <hr className="my-2" />
              <p>
                <p className="font-bold my-2">Symptoms</p>
                {item.symptoms.map((symptom, idx) => (
                  <p
                    key={idx}
                    className="bg-green-200 p-2 rounded-full my-1 text-center"
                  >
                    {symptom}
                  </p>
                ))}
                <hr className="my-2" />
              </p>
              <p>
                <p className="font-bold my-2">Home Remedies</p>
                {item.home_remedies.map((remedy, idx) => (
                  <p key={idx}>
                    {idx + 1}: {remedy}
                  </p>
                ))}
              </p>
            </div>
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Allergies;
