import React from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { BsExclamationTriangle, BsBank, BsClipboardDataFill, BsTree, BsDatabaseFillAdd, BsPersonCheck, BsPersonGear, BsSliders2, BsGrid1X2Fill } from "react-icons/bs";
import AllPost from './AllPost';
import HostedPost from './HostedPost';
import Profile from '../Post/Profile';
import AdminNavbar from '../components/AdminNavbar'
import PostDetails from '../Post/PostDetails';
import MyPostChecking from './MyPostChecking';
import MyCheckedPost from './MyCheckedPost';
import Pdf from './AddPdf';
import PlantInfo from './AddPlantInfo';
const AdminLayout = () => {

  const path = useLocation().pathname;


  const icons = {
    BsClipboardDataFill: BsClipboardDataFill,
    BsDatabaseFillAdd: BsDatabaseFillAdd,
    BsSliders2: BsSliders2,
    BsBank: BsBank,
    BsGrid1X2Fill: BsGrid1X2Fill,
    BsTree: BsTree,
    BsPersonCheck: BsPersonCheck,
    BsPersonGear: BsPersonGear,

  };

  const arr = [
    {
      path_icon: "BsGrid1X2Fill",
      path_name: "All Post",
      path_link: "/admin/",
    },
    {
      path_icon: "BsClipboardDataFill",
      path_name: "Hosted Post",
      path_link: "/admin/host-post",
    },

    {
      path_icon: "BsPersonGear",
      path_name: "My Checking Post",
      path_link: "/admin/my-checking-post",
    },
    {
      path_icon: "BsPersonCheck",
      path_name: "My Checked Post",
      path_link: "/admin/my-checked-post",
    },
    {
      path_icon: "BsBank",
      path_name: "Practionr's",
      path_link: "/admin/practioner",
    },

  ]

  return (
    <>
      <AdminNavbar />
      <div className='w-full flex text-gray-800'>


        <div className='md:flex hidden w-[80px]  h-screen bg-green text-sm font-semibold flex-col justify-center rounded-tr-3xl'>
          <div className='flex flex-col items-center text-white justify-center'>
            {arr.map((element, index) =>
            (

              <ul key={index} className=' '>
                <Link to={element.path_link}>
                  <li
                    className={`relative w-full flex gap-2 justify-start items-center py-4 text-3xl
                    ${path === element.path_link ? 'bg-green border-2 p-4 rounded-2xl transition-[all,500ms]' : ''}`}
                  >
                    {icons[element.path_icon] && React.createElement(icons[element.path_icon], { className: 'icon-class' })}

                    {/* Tooltip */}
                    <span className="tooltip-text">
                      {element.path_name}
                    </span>
                  </li>

                </Link>
              </ul>


            ))}
          </div>
        </div>

        <div className=' md:block hidden md:w-[95%] lg:h-screen  w-full md:p-2 overflow-y-scroll scroll-smooth'>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/" element={<AllPost />} />
            <Route path="/host-post" element={<HostedPost />} />
            <Route path="/my-checking-post" element={<MyPostChecking />} />
            <Route path="/my-checked-post" element={<MyCheckedPost />} />
            <Route path="/practioner" element={<Pdf />} />
            <Route path="/plant-info" element={<PlantInfo />} />
          </Routes>
        </div>
        <div className='md:hidden  flex justify-center items-center m-auto px-4 animate-pulse'>


          <div className=" bg-green-100 border-l-4 border-green-600 text-green-800 p-4 rounded-md shadow-md my-4">
            <div className="flex items-center gap-3">
              <BsExclamationTriangle className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold">Desktop View Recommended</p>
                <p className="text-sm text-green-700">
                  For the best experience, please open this site in desktop mode.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default AdminLayout;
