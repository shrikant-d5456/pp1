import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { BsXCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    age: '',
    gender: '',
    educationLevel: '',
    languagesSpoken: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const { fullName, username, email, password, phoneNo, age, gender, educationLevel, languagesSpoken, address } = formData;

    if (step === 1) {
      if (!username.trim()) newErrors.username = 'Username required';
      if (!email.trim()) newErrors.email = 'Email required';
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
      if (!password || password.length < 6) newErrors.password = 'Min 6 characters';
    }

    if (step === 2) {
      if (!fullName.trim()) newErrors.fullName = 'Full Name required';
      if (!phoneNo.trim() || !/^\d{10}$/.test(phoneNo)) newErrors.phoneNo = 'Valid phone required';
      if (!age || isNaN(age) || age < 1) newErrors.age = 'Valid age required';
      if (!gender) newErrors.gender = 'Gender required';
    }

    if (step === 3) {
      if (!educationLevel) newErrors.educationLevel = 'Education required';
      if (!languagesSpoken.trim()) newErrors.languagesSpoken = 'Enter at least one language';
      if (!address.street || !address.city || !address.state || !address.pincode)
        newErrors.address = 'Complete address required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const payload = {
      ...formData,
      languagesSpoken: formData.languagesSpoken.split(',').map((l) => l.trim()),
    };

    try {
      await axios.post('http://localhost:8000/auth/api/sign', payload);
      toast.success('Signup successful!');
      navigate('/login');
    } catch (err) {
      toast.error('Signup failed. Try again.');
    }
  };

  const CloseEventCall = () => {
    setModalIsOpen(false);
    navigate('/');
  };

  const stepImages = [
    {
      img: "https://www.ayurythm.com/home/wp-content/uploads/2022/07/medicinal-neem-leaves-mortar-pestle-with-neem-paste-juice-twigs-green-surface-01-1.jpg",
      heading: "Create Your Account",
      desc: "Set your username, email and secure password to get started."
    },
    {
      img: "https://birlaayurveda.co.in/wp-content/uploads/2021/09/About-Birla-Ayurveda.jpg",
      heading: "Add Personal Info",
      desc: "Let us know you better with your full name, contact and age."
    },
    {
      img: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/09/ayurvedic-1296x728-header.jpg?w=1155&h=1680",
      heading: "Complete Your Profile",
      desc: "Tell us where you're from and what languages you speak."
    }
  ];



 return (
  <Modal isOpen={modalIsOpen} className="transition-all" preventScroll={false}>
    <div className="flex w-full h-screen justify-center items-center text-center ">
      <div className="lg:w-10/12 md:w-6/12 w-[90%] flex text-start h-[600px] border-8 border-white shadow-xl lg:rounded-tl-3xl lg:rounded-br-3xl loginbgimg">
        
        {/* Left Image Panel */}
        <div className="lg:block hidden w-1/2 text-white p-4">
          <p className='text-4xl font-bold mt-60'>Ayurveda Blog: Where Healing Meets Heritage</p>
          <p className='text-sm mt-5'>
            "Dive into the world of Ayurveda — a 5,000-year-old healing science rooted in nature.
            Read, post, and share natural remedies, wellness tips, and herbal knowledge to empower and heal."
          </p>
        </div>

        {/* Right Form Panel */}
        <div className="relative lg:w-1/2 w-full flex flex-col gap-4 bg-white p-4  overflow-y-auto max-h-full">
          <button
            className="absolute top-4 left-4 text-2xl text-gray-400 rounded-full"
            onClick={CloseEventCall}
          >
            <BsXCircleFill />
          </button>

          <p className="font-bold text-xl text-center text-gray-800">
            Discover <br /> Ancient Ayurveda Wisdom
          </p>

          <p className="text-md text-center text-green font-bold">
            Welcome to Signup Page
          </p>

          <p className="text-sm text-center text-gray-500">Step {step} of 3</p>

          <form onSubmit={handleRegister} className="space-y-3 w-full">
            {step === 1 && (
              <>
                <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className=" w-full text-center inp" />
                {errors.username && <p className="text-red-500 text-xs p-0">{errors.username}</p>}

                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className=" w-full text-center inp" />
                {errors.email && <p className="text-red-500 text-xs p-0">{errors.email}</p>}

                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className=" w-full text-center inp" />
                {errors.password && <p className="text-red-500 text-xs p-0">{errors.password}</p>}
              </>
            )}

            {step === 2 && (
              <>
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className=" w-full text-center inp" />
                {errors.fullName && <p className="text-red-500 text-xs p-0">{errors.fullName}</p>}

                <input name="phoneNo" value={formData.phoneNo} onChange={handleChange} placeholder="Phone Number" className=" w-full text-center inp" />
                {errors.phoneNo && <p className="text-red-500 text-xs p-0">{errors.phoneNo}</p>}

                <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" className=" w-full text-center inp" />
                {errors.age && <p className="text-red-500 text-xs p-0">{errors.age}</p>}

                <select name="gender" value={formData.gender} onChange={handleChange} className=" w-full text-center inp">
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs p-0">{errors.gender}</p>}
              </>
            )}

            {step === 3 && (
              <>
                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className=" w-full text-center inp">
                  <option value="">Select Education Level</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>Higher Secondary</option>
                  <option>Graduate</option>
                  <option>Postgraduate</option>
                  <option>Other</option>
                </select>
                {errors.educationLevel && <p className="text-red-500 text-xs p-0">{errors.educationLevel}</p>}

                <input name="languagesSpoken" value={formData.languagesSpoken} onChange={handleChange} placeholder="Languages (comma separated)" className=" w-full text-center inp" />
                {errors.languagesSpoken && <p className="text-red-500 text-xs p-0">{errors.languagesSpoken}</p>}

                <input name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" className=" w-full text-center inp" />
                <input name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" className=" w-full text-center inp" />
                <input name="address.state" value={formData.address.state} onChange={handleChange} placeholder="State" className=" w-full text-center inp" />
                <input name="address.pincode" value={formData.address.pincode} onChange={handleChange} placeholder="Pincode" className=" w-full text-center inp" />
                {errors.address && <p className="text-red-500 text-xs p-0">{errors.address}</p>}
              </>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <button type="button" onClick={handleBack} className="px-4 py-1 bg-gray-300 rounded-full hover:bg-gray-400">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={handleNext} className="px-4 py-1 bg-green text-white rounded-full hover:bg-green-800">
                  Next
                </button>
              ) : (
                <button type="submit" className="px-4 py-1 bg-green text-white rounded-full hover:bg-green-800">
                  Sign Up
                </button>
              )}
            </div>

            <p className="text-sm text-center">
              Already have an account?
              <Link to="/login" className="text-blue-500 font-semibold underline ml-1">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </Modal>
);

};

export default Signup;
