import React from 'react';
import { BsGoogle, BsFacebook, BsTwitterX, BsInstagram, BsYoutube } from 'react-icons/bs';
import logo from "../../assets/logo.jpeg";
import qrcode from '../../assets/qrcode.png';
function Footer() {
    return (
        <div className='w-screen text-sm border-t-2  bg-white/80'>
            <footer className="lg:flex w-screen ">

                <div className="lg:w-2/5 p-4 m-auto ">
                    <h1 className="text-2xl font-bold ml-4 mb-4"> <img src={logo} alt="" className=' w-44' /> </h1><hr className='border-green' />
                    {/* <span className="flex gap-8 text-2xl m-4 text-gray-800">
                        <i><BsGoogle className='text-black' /></i>
                        <i><BsInstagram className='text-black' /></i>
                        <i><BsFacebook className='text-black' /></i>
                        <i><BsYoutube className='text-black' /></i>
                        <i><BsTwitterX className='text-black' /></i>
                    </span> */}
                    <img src={qrcode} alt="" className=' p-8' />
                    <p>Scan QR code by using Google lense and visit our website</p>
                </div>

                <div className="lg:w-3/5 w-full p-2 lg:flex gap-4 list-none ">
                    <hr />
                    <div className="m-2 flex flex-col gap-2">
                        <li className="font-medium ">Information</li>
                        <a target='_blank' href="https://sprightly-jelly-8a9a67.netlify.app/"><li className=' hover:text-blue-500 hover:underline text-gray-800  '>Privacy Policy</li></a>
                        <a target='_blank' href="https://thunderous-kataifi-d6b77b.netlify.app/"><li className=' hover:text-blue-500 hover:underline text-gray-800  '>Terms & Conditions</li></a>
                       
                    </div>
                    <hr />
                    <div className="m-2">
                        <ul className="flex flex-col gap-2 list-none">
                            <li className="font-medium">Contact Us</li>
                            <li className="text-gray-800">Mangaon, Raigad</li>
                            <li className="text-gray-800">
                                Email -
                                <a target='_blank' href="mailto:support@aayurmedguide.com" className="text-blue-600 ml-1">
                                    support@aayurmedguide.com
                                </a>
                            </li>
                           
                        </ul>
                    </div>

                    <hr />
                </div>
            </footer>
            <div className=" p-2 text-center font-semibold ">
                <p className='text-sm my-4'>Designed &👩🏻‍💻by Developer | © All Rights Reserved {new Date().getFullYear()} </p>
            </div>
        </div>
    )
}

export default Footer