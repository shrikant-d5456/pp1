import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Utils/UserContext.jsx';
import ProfilePost from './ProfilePost.jsx';
import AdminIDs from '../Utils/AdminIDs.jsx';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [checkId, setCheckId] = useState("");

  const getUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/user/${user.id}`);
      const userData = resp.data.data;
      setData(userData);
      setUsername(userData.username);
      setEmail(userData.email);
      setPassword(userData.password);
      setFullName(userData.fullName);
      setPhoneNo(userData.phoneNo);
      setAge(userData.age);
      setGender(userData.gender);
      setEducationLevel(userData.educationLevel);
      setLanguagesSpoken(userData.languagesSpoken || []);
      setAddress(userData.address || {});
    } catch (err) {
      console.log(err);
    }
  };

  const setUser = async () => {
    try {
      const resp = await axios.put(`http://localhost:8000/auth/user/${user.id}`, {
        username,
        email,
        password,
        fullName,
        phoneNo,
        age,
        gender,
        educationLevel,
        languagesSpoken,
        address
      });
      setData(resp.data.data);
      toast("User Updated");
    } catch (err) {
      console.log(err);
      toast("Something went wrong!!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
const renderForm = (
  <div className="max-w-5xl w-full mx-auto border border-[#00ff26] bg-white/50 p-6 md:flex md:gap-8">
    {/* Left Side - Profile Info */}
    <div className="md:w-1/3 w-full flex flex-col items-center text-center mb-6 md:mb-0">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="Profile"
        className="w-28 h-28 rounded-full mb-4 shadow-md border-4 border-white"
      />
      <h2 className="text-2xl font-bold text-gray-800">Update Your Profile</h2>
      <p className="text-gray-500 text-sm mt-2 px-2">
        Keep your profile up to date so we can provide you the best experience.
      </p>
    </div>

    {/* Right Side - Form Fields */}
    <div className="md:w-2/3 w-full flex flex-col gap-4 text-sm">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="inp"
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="inp"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="inp"
        placeholder="Password"
      />
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="inp"
        placeholder="Full Name"
      />
      <input
        type="text"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
        className="inp"
        placeholder="Phone Number"
      />

      <div className="flex gap-4">
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="inp w-1/2"
          placeholder="Age"
        />
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="inp w-1/2"
          placeholder="Gender"
        />
      </div>

      <input
        type="text"
        value={educationLevel}
        onChange={(e) => setEducationLevel(e.target.value)}
        className="inp"
        placeholder="Education Level"
      />
      <input
        type="text"
        value={languagesSpoken.join(", ")}
        onChange={(e) =>
          setLanguagesSpoken(e.target.value.split(",").map((lang) => lang.trim()))
        }
        className="inp"
        placeholder="Languages Spoken (comma separated)"
      />

      {/* Address Group */}
      <div className="border-t border-gray-200 pt-4 mt-1 gap-4">
        <p className="text-md font-semibold text-gray-700 mb-2">Address Details</p>
        <input
          type="text"
          value={address.street || ""}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="inp w-full"
          placeholder="Street"
        />
        <div className="flex gap-4 w-full flex-col ">
          <input
            type="text"
            value={address.city || ""}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="inp  w-full my-2"
            placeholder="City"
          />
          <input
            type="text"
            value={address.state || ""}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="inp  w-full"
            placeholder="State"
          />
        </div>
        <input
          type="text"
          value={address.pincode || ""}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
          className="inp w-full my-2"
          placeholder="Pincode"
        />
      </div>

      <button
        onClick={setUser}
        className="mt-6 bg-[#00cc44] hover:bg-[#00aa3b] transition duration-200 text-white font-semibold py-2  shadow-md"
      >
        ✅ Save Profile
      </button>
    </div>
  </div>
);



  return (
    <div className='w-11/12 m-auto'>
      <div className='flex-col w-full'>

        {user.username === "admin" ? (
          <div className=' w-full'>
            <label htmlFor="inp" className='text-sm font-semibold'>Enter Admin ID to Update Profile</label>
            <input
              type="text"
              id='inp'
              value={checkId}
              onChange={(e) => setCheckId(e.target.value)}
              className='w-full text-sm px-1 py-2 border border-[#00ff26] outline-none'
              placeholder='Enter Admin ID'
            />
          </div>
        ) : null}

        {user.username === "admin" && AdminIDs.some((admin) => admin.id === checkId) ? (
          <div className=' w-full mt-4'>
            <p className='text-2xl font-semibold my-4 text-gray-800'>Admin Profile Editor</p>
            {renderForm}
          </div>
        ) : null}

        {user.username !== "admin" && (
          <div className=' w-full'>
            <p className='text-2xl font-semibold my-4 text-gray-800'>Your Profile</p>
            {renderForm}
          </div>
        )}
         <p className='text-2xl font-semibold my-4 pl-2 text-gray-800'>Your Post</p>
      <hr className='border-[#00ff26] border-[1px] bg-white' />
        <div className=' w-full my-4'>
          <div className=' grid gap-2 lg:grid-cols-4 md:grid-cols-3 grid-cols-1'>
            <ProfilePost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
