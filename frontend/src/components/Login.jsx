import React, { useState, useContext } from 'react';
import axios from 'axios';
import { URL } from '../url.js';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Utils/UserContext.jsx';
import { BsXCircleFill } from 'react-icons/bs';
import Modal from "react-modal";
import AdminIDs from '../Utils/AdminIDs.jsx';
import {toast} from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("user");
  const [err, setErr] = useState(false);
  const { setUser } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resp = await axios.post(`http://localhost:8000/auth/api/login`, { email, password });
      setUser(resp.data);
      // localStorage.setItem('data',resp.data);
      // console.log(resp.data);
      toast.success("Login successful");
      setErr(false);
      setModalIsOpen(false);
      // console.log(resp.data.id);

      if (AdminIDs.some((admin) => admin.id === resp.data.id)) {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error('Something went wrong',error);
      setErr(true);
    }
  };

  const CloseEventCall = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  return (
    <>
  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={CloseEventCall}
        className="transition-all"
        preventScroll={false}
      >
        <div className="flex w-full h-screen justify-center items-center text-center bg-none">


          <div className="lg:w-10/12 md:w-6/12  flex text-start h-[600px]  border-8 border-white  shadow-xl lg:rounded-tl-3xl lg:rounded-br-3xl loginbgimg">
            <div className="lg:block hidden w-1/2 text-white p-4 ">
            <p  className=' text-4xl font-bold mt-60 '>Ayurveda Blog: Where Healing Meets Heritage</p>
            <p className=' text-sm mt-5'>
              "Dive into the world of Ayurveda — a 5,000-year-old healing science rooted in nature. Read, post, and share natural remedies, wellness tips, and herbal knowledge to empower and heal."
            </p>
            </div>


            <div className=" relative lg:w-1/2 w-full flex flex-col gap-4 bg-white p-4 ">
              <button
                className="absolute top-4 left-4 text-2xl text-gray-400 rounded-full "
                onClick={CloseEventCall}
              >
                <BsXCircleFill />
              </button>
              <p className="font-bold text-xl text-center text-gray-800">
                Unlock <br /> Maximum Savings
              </p>

              <p className="text-md text-center text-green font-bold">
                Welcome to Log In Page
              </p>

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="inp"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="inp"
              />

              <button
                type="submit"
                onClick={handleLogin}
                className="bg-green py-1 rounded-2xl hover:bg-green-800 text-white font-semibold transition-all"
              >
                Log In
              </button>

              <p className=' text-sm'>
                You Don't have an account?
                <Link to="/signup" className="text-blue-500 tracking-wider  font-semibold text-sm underline px-1">
                  SignUp
                </Link>
              </p>

              {err && (
                <p className="text-center text-red-500 text-sm underline">
                  Something went wrong
                </p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
