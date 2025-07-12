import React, { useEffect, useState } from "react";
import { plants } from "../Data/Plants";
import { BsSearch } from "react-icons/bs";
import Magic from "./Magic";

const MedicinalPlants = () => {
  const [category, setCategory] = useState("all");
  const [input, setInput] = useState("");
  const [filteredplants, setFilteredPlants] = useState(plants);
  const [magic, setMagic] = useState(false);

  const healthbenefits = [
    "Immunity Boost",
    "Digestive Health",
    "Anti-inflammatory",
    "Respiratory Health",
    "Blood Sugar Regulation",
  ];

  const handleSearch = () => {
    setFilteredPlants(
      plants.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.hindiname.toLowerCase().includes(input.toLowerCase()) ||
          item.description.toLowerCase().includes(input.toLowerCase()) ||
          item.uses.toLowerCase().includes(input.toLowerCase()) ||
          item.about.toLowerCase().includes(input.toLowerCase()) ||
          item.healthbenefits.some((benefit) =>
            benefit.toLowerCase().includes(input.toLowerCase())
          )
      )
    );
    setTimeout(() => {
      setMagic(false);
    }, 2000);
    setMagic(true);
  };

  // Update filtered plants when category changes
  useEffect(() => {
    if (category === "all") {
      setFilteredPlants(plants);
    } else {
      setFilteredPlants(
        plants.filter((item) => item.healthbenefits.includes(category))
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
      <div className=" fixed top-1 bg-white py-4 mt-24 w-full flex flex-wrap gap-2 justify-center my-4">
        {healthbenefits.map((item, index) => (
          <button
            key={index}
            className={`border-[1px] border-green rounded-full px-4 py-1 ${
              item === category ? "bg-green text-white" : "text-green"
            }`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search a Plant"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-[1px] text-sm border-gray-300 px-4 py-2 rounded-full"
        />
        <button
          onClick={handleSearch}
          className="bg-green text-white p-3 rounded-full "
        >
          <BsSearch />
        </button>
      </div>

      <div className=" mt-24">
        <p className="text-center sm:my-4 my-8 text-4xl font-bold text-gray-800">
          Medicinal Plants
        </p>

        {(category !== "all" || input !== "") && (
          <p className="font-bold uppercase text-green underline ml-8 my-4">
            Filter by {input || category}
          </p>
        )}

        {filteredplants.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 w-10/12 m-auto transition-all"
          >
            <div className="w-full flex-row-reverse sm:flex-row flex gap-2 ">
              <div className="md:w-2/3 w-full border-[1px] border-gray-100 p-4 text-white rounded-3xl shadow-md  bg-gradient-to-r from-green-800 to-green-500">
                <p className=" font-bold my-1"> Name of Plant </p>
                {item.name}
                <hr className=" my-2 " />{" "}
                <p className="font-semibold my-2">Hindi Name </p>
                {item.hindiname}
                <hr className=" my-2" />{" "}
                <p className=" font-bold mb-1">About</p>
                <p>{item.about}</p>
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
                <p className="font-bold my-2">Benefits</p>
                {item.healthbenefits.map((benefit, idx) => (
                  <p
                    key={idx}
                    className="bg-green-200 p-2 rounded-full my-1 text-center"
                  >
                    {benefit}
                  </p>
                ))}
                <hr className="my-2" />
              </p>
              <p>
                <p className="font-bold my-2">Uses</p>
                {item.uses.map((use, idx) => (
                  <p key={idx}>
                    {idx + 1}: {use}
                  </p>
                ))}
              </p>
            </div>
            <hr className="font-semibold my-4" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MedicinalPlants;
