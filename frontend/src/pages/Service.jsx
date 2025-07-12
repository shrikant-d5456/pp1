import React from "react";

const Service = () => {
  const array = [
    {
      id: "1",
      heading: "Verified Blogs",
      subHeading:
        "All the information used on the website is verified and is easily accessible due to our Expert's help!",
    },
    {
      id: "2",
      heading: "Language Translation",
      subHeading:
        "This service allows you to change the default language to your preferred language of reading.",
    },
    {
      id: "3",
      heading: "Image Recognition",
      subHeading:
        "Upload or click pictures of any plant to recognize and use the plant as per your needs!",
    },
    {
      id: "4",
      heading: "Text-to-Speech",
      subHeading:
        "You'll be able to listen to blogs which are verified by our Experts!",
    },
  ];

  return (
    <main
      id="service"
      className="w-full md:w-10/12 flex flex-col items-center py-10  m-auto"
    >
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
          Our Ayurvedic Approach
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At AyurMedGuide, we follow a unique and personalized approach to
          showcasing Ayurvedic knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-0">
        {array.map((item, ind) => (
          <div
            key={ind}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 "
          >
            <div className="bg-green-100 text-green-800 w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg mb-4 shadow-md">
              {item.id}
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2 text-center">
              {item.heading}
            </h3>
            <p className="text-gray-600 text-sm text-center">{item.subHeading}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Service;
