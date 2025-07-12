import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url.js';
import { UserContext } from '../Utils/UserContext.jsx';
import ProfilePost from './ProfilePost.jsx';
import AdminIDs from '../Utils/AdminIDs.jsx';
// import Navbar from '../components/Navbar';
import {toast} from 'react-toastify';
const Profile = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkId, setCheckId] = useState("");

  const getUser = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/user/${user.id}`);
      const userData = resp.data.data;
      setData(userData);
      setUsername(userData.username);
      setEmail(userData.email);
      setPassword(userData.password);
    } catch (err) {
      console.log(err);
    }
  };

  const setUser = async () => {
    try {
      const resp = await axios.put(`http://localhost:8000/auth/user/${user.id}`, {
        username,
        email,
        password
      });
      setData(resp.data.data);
      toast("user Updated")
      // console.log("updated ")
    } catch (err) {
      console.log(err);
      toast("somting went wrong!!")
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    
      <div className='w-11/12 h-full m-auto'>
        <p className=' text-2xl font-semibold my-4 pl-2 text-gray-800'>Your Post</p>

        <hr className=' border-[#00ff26] border-[1px] bg-white' />

        <div className='lg:flex w-full my-4'>

          <div className='lg:w-4/5 w-full justify-cent er items-center '>
            <div className='flex flex-wrap p-4'>
              <ProfilePost />
            </div>
          </div>

         
          
          {user.username === "admin" ? 
         
          <div className='lg:w-1/5 '>
          <label htmlFor="inp" className=' text-sm font-semibold'>Enter Admin ID to Update Profile</label>
            <input
              type="text"
              id='inp'
              value={checkId}
              onChange={(e) => setCheckId(e.target.value)}
              className=' w-full text-sm px-1 py-2 border-[1px] border-[#00ff26] outline-none'
              placeholder='Enter Admin ID'
            />
          </div>
          :""}
          

            {
              user.username === "admin" && AdminIDs.some((admin) => admin.id === checkId) ?

                <>
                  <p className=' text-2xl font-semibold my-4 text-gray-800'>Your Profile</p>
                  <div className=' flex flex-col gap-2 text-sm border-[1px] border-[#00ff26] p-4 bg-white' >

                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='inp'
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='inp'
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='inp'
                    />

                    <button onClick={setUser} className=' bg-green-500 text-white'>Update</button>

                  </div>
                </>

                :
                ""
            }
          


          {user.username === "admin" ? "" :
            <div className='lg:w-1/5  '>
              <p className=' text-2xl font-semibold my-4 text-gray-800'>Your Profile</p>
              <div className=' flex flex-col gap-2 text-sm border-[1px] border-[#00ff26] p-4 bg-white' >

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='inp'
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='inp'
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='inp'
                />

                <button onClick={setUser} className=' bg-green-500 text-white py-2'>Update</button>

              </div>
            </div>
          }


        </div>

      </div>
    </>
  );
};

export default Profile;