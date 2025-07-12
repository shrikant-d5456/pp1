const AyurvedaPage = () => {
  return (
    <div className="min-h-screen  p-6 lg:flex lg:gap-6">
      {/* Left Side Image */}
      <div className="lg:w-1/2 w-full h-[300px] lg:h-auto mb-6 lg:mb-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Physician_taking_pulse.jpg"
          alt="Ayurveda"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Side Content */}
      <div className="lg:w-1/2 w-full  space-y-10">
        {/* What is Ayurveda */}
        <section className="bg-white/80 rounded-2xl border shadow-sm p-4">
          <h2 className="text-3xl font-extrabold text-green-800 mb-4">What is Ayurveda?</h2>
          <p className="text-gray-700 leading-relaxed">
            Ayurveda is a traditional system of medicine originating from the Indian subcontinent. It emphasizes balance among bodily elements—vata, pitta, and kapha—for health. Therapies include herbal medicines, special diets, yoga, meditation, massage, and surgical techniques described in ancient texts like the Sushruta Samhita.
          </p>
        </section>

        {/* Eight Branches */}
        <section className="bg-white/80 rounded-2xl border shadow-sm p-4">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Aṣṭāṅga Ayurveda – Eight Branches</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Kāyachikitsā:</strong> General medicine</li>
            <li><strong>Kaumāra-bhṛtya:</strong> Pediatrics</li>
            <li><strong>Śalyatantra:</strong> Surgery</li>
            <li><strong>Śhālākyatantra:</strong> ENT and ophthalmology</li>
            <li><strong>Bhūtavidyā:</strong> Psychiatry and spiritual healing</li>
            <li><strong>Agadatantra:</strong> Toxicology</li>
            <li><strong>Rasāyantantra:</strong> Rejuvenation</li>
            <li><strong>Vājīkaraṇatantra:</strong> Aphrodisiacs and fertility</li>
          </ul>
        </section>

        {/* Global Ayurveda */}
        <section className="bg-white/80 rounded-2xl border shadow-sm p-4">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Global Overview</h3>
          <p className="text-gray-700 mb-3">
            Ayurveda is widely practiced in India and Nepal. Education is formalized through the Bachelor of Ayurvedic Medicine and Surgery (BAMS) degree.
          </p>
          <p className="text-gray-700">
            <strong>Modern Ayurveda:</strong> Biomedical, mostly in India. <br />
            <strong>Global Ayurveda:</strong> Linked with yoga, spirituality, wellness.
          </p>
        </section>

        {/* India */}
        <section className="bg-white/80 rounded-2xl border shadow-sm p-4">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">India</h3>
         
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>80% population</strong> uses Ayurveda</li>
            <li><strong>Education:</strong> 180+ centers, UG & PG institutions</li>
            <li><strong>Insurance:</strong> Partial coverage for diseases</li>
            <li><strong>Criticism:</strong> Some groups label Ayurveda pseudoscience</li>
            <li><strong>WHO:</strong> Many rural doctors lack qualifications</li>
          </ul>
        </section>

        {/* Nepal */}
        <section className="bg-white/80 rounded-2xl border shadow-sm p-4">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Nepal</h3>
          <p className="text-gray-700">
            Ayurveda is used by 75–80% of the population and remains the most trusted form of traditional medicine.
          </p>
        </section>

        {/* Sri Lanka */}
        <section className="bg-white/80 rounded-2xl border shadow-sm p-4">
          <h3 className="text-2xl font-semibold text-green-700 mb-3">Sri Lanka</h3>
         
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Similar tradition to India with some unique herbs</li>
            <li>Ministry of Indigenous Medicine oversees Ayurveda</li>
            <li>Institute of Indigenous Medicine (Univ. of Colombo)</li>
            <li>62 hospitals and 208 dispensaries serve 3M+ people</li>
            <li>~20,000 registered practitioners</li>
            <li><strong>Mihintale:</strong> World’s oldest hospital (4th century BCE)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AyurvedaPage;
