import React from "react";

const DiscoverAayurveda = () => {
  const array = [
    {
      img: "https://th.bing.com/th/id/OIP.filZ9uARTGfJRqIMQ5pCrAHaH2?rs=1&pid=ImgDetMain&cb=idpwebpc2",
      heading: "Personalized Wellness",
      subheading: "Get treatments crafted for you based on your unique doshas (Vata, Pitta, Kapha).",
    },
    {
      img: "https://awsimages.detik.net.id/community/media/visual/2021/07/13/ilustrasi-herbal.jpeg?w=700&q=90",
      heading: "Herbal Remedies",
      subheading: "Discover the healing power of natural herbs used in Ayurvedic treatments for centuries.",
    },
    {
      img: "https://e2e85xpajrr.exactdn.com/wp-content/uploads/2021/07/21190510/Soccer-Player-Diet-1.webp?strip=all&lossy=1&ssl=1",
      heading: "Diet & Nutrition",
      subheading: "Learn dietary practices that align with your body constitution to maintain balance and health.",
    },
    {
      img: "https://th.bing.com/th/id/R.0bc79afacdedaa3546f9dc9d8bfa1706?rik=pBDaK17hTg4NWg&riu=http%3a%2f%2fchristinalombardo.com%2fwp-content%2fuploads%2f2020%2f10%2fBody-Spirit-Mind-Balance.jpg&ehk=AxHfp2mwBUVFxXetRyrvj5HJEjeBEXT8ynYm1iZCx70%3d&risl=&pid=ImgRaw&r=0",
      heading: "Mind-Body Balance",
      subheading: "Integrate yoga, meditation, and mindfulness techniques to harmonize mind and body.",
    },
  ];

  return (
    <main id="about" className=" w-full py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-green-800 mb-4">Discover Ayurveda’s Magic With Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ayurveda aims to balance your body and mind, bringing harmony and vitality. Experience ancient wisdom for a modern healthy life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
        
        {/* Left 2 cards */}
        <div className="flex flex-col gap-8">
          {array.slice(0, 2).map((item, ind) => (
            <div key={ind} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-center text-center">
              <img loading="lazy" src={item.img} alt={item.heading} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">{item.heading}</h3>
              <p className="text-gray-600 text-sm">{item.subheading}</p>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center">
          <img
            src="https://cdn.vectorstock.com/i/preview-1x/34/95/woman-doing-yogasan-for-international-yoga-day-vector-25123495.jpg"
            alt="Ayurveda Illustration"
            className="w-64 h-64 object-contain rounded-full scale-110"
          />
        </div>

        {/* Right 2 cards */}
        <div className="flex flex-col gap-8">
          {array.slice(2, 4).map((item, ind) => (
            <div key={ind} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-center text-center">
              <img loading="lazy" src={item.img} alt={item.heading} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">{item.heading}</h3>
              <p className="text-gray-600 text-sm">{item.subheading}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default DiscoverAayurveda;