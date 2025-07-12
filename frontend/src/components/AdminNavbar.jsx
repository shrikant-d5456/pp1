import React, { useContext, useState } from 'react'
import axios from 'axios'
import { URL } from '../url.js';
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { UserContext } from '../Utils/UserContext.jsx';
import { BsBag, BsFilePost, BsList, BsPersonAdd, BsPersonDashFill, BsPerson, BsSearch, BsX } from 'react-icons/bs';
import { BsBank, BsClipboardDataFill, BsDatabaseFillAdd, BsFileEarmarkArrowUpFill, BsPersonVcardFill, BsSliders2, BsGrid1X2Fill } from "react-icons/bs";
import logo from "../../assets/logo.jpeg";
import {toast} from 'react-toastify';

const AdminNavbar = () => {

    const navigate = useNavigate();
    const path = useLocation().pathname;
    const { user, setUser } = useContext(UserContext);
    const [menu, setmenu] = useState(false);

    const handlelogout = async () => {
        const ans = confirm("you want to logout 🤔");
        if(ans){
            try {
                const resp = await axios.post("http://localhost:8000/auth/api/logout")
                console.log(resp.data);
                setUser(null);
                toast.success("logout successfully")
                setmenu(false)
                navigate('/login');
            }
            catch (err) {
                console.log("someting went wrongs")
            }
        }
    }

    const icons = {
        BsClipboardDataFill: BsClipboardDataFill,
        BsDatabaseFillAdd: BsDatabaseFillAdd,
        BsFileEarmarkArrowUpFill: BsFileEarmarkArrowUpFill,
        BsPersonVcardFill: BsPersonVcardFill,
        BsSliders2: BsSliders2,
        BsBank: BsBank,
        BsGrid1X2Fill: BsGrid1X2Fill,

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
            path_icon: "BsPersonVcardFill",
            path_name: "Checked Post",
            path_link: "/admin/view_students",
        },

        {
            path_icon: "BsSliders2",
            path_name: "My Validation",
            path_link: "/admin/my-validation",
        },
        {
            path_icon: "BsSliders2",
            path_name: "My Check Post",
            path_link: "/admin/my-check-post",
        },
    ]

    return (
        <header>

            <div className=' bg-green text-white font-semibold text-center p-1 overflow-hidden'>
                <p className=' text-sm '>Welcome! {user?.username}</p>
            </div>

            <div className='flex justify-between items-center px-4 border-b-[1px] bg-white border-gray-200'>
                <Link to="/admin"> <div className=' w-40 py-2'><img loading="lazy" src={logo} alt="logo" /></div></Link>
                <div className='md:hidden block z-10 absolute top-14 right-14 bg-white w-fit bg-color-blue-dark border-r-[1px] border-green text-sm font-semibold'>

                    {user && menu && arr.map((element, index) =>
                    (
                        <ul key={index}>

                            <Link to={element.path_link}>
                                <li className={`w-full flex gap-2 justify-start items-center py-2 px-4 rounded-sm 
                                ${path === element.path_link ? ' bg-green text-white ' : ''}`}
                                onClick={()=>setmenu(!menu)}
                                >
                                    {icons[element.path_icon] && React.createElement(icons[element.path_icon], { className: 'icon-class' })}
                                    {element.path_name}
                                </li>
                            </Link>
                        </ul>
                    ))}
                    {menu &&
                        <>
                            {user ?
                                <>
                                <span className='flex gap-2 justify-start items-center py-2 px-4 rounded-sm hover:bg-green hover:text-white cursor-pointer'
                                    onClick={() => navigate("/admin/profile") || setmenu(!menu)}
                                ><BsPersonAdd />Profile
                                </span>
                                <span className='flex gap-2 justify-start items-center py-2 px-4 rounded-sm hover:bg-green hover:text-white cursor-pointer'
                                    onClick={() => handlelogout}
                                ><BsPersonAdd />Logout
                                </span>
                                </>
                                :
                                <span className='flex gap-2 justify-start items-center py-2 px-4 rounded-sm hover:bg-green hover:text-white cursor-pointer'
                                    m
                                >
                                    <BsPersonAdd />Login
                                </span>
                            }
                        </>
                    }
                </div>

                <div>
                    <button className='lg:hidden block bg-white text-xl p-2 ' onClick={() => setmenu(!menu)}>{menu ? <BsX /> : <BsList />}</button>
                    <div className=' lg:flex hidden py-2 px-8 gap-8 '>
                        {!user &&
                            <span className='flex gap-2 justify-center items-center hover:text-green-800 cursor-pointer' onClick={() => navigate("/login")}><BsPersonAdd />Login</span>
                        }
                        {user &&
                            <>
                                <Link to="/admin/profile">
                                    <span onClick={() => setmenu(false)} className='flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                                        <BsPerson />
                                        Profile
                                    </span>
                                </Link>
                                <span onClick={handlelogout} className='flex gap-2 justify-center items-center hover:text-green-800 cursor-pointer'><BsPersonDashFill />Logout</span>
                            </>}
                    </div>
                </div>

            </div>


        </header>
    )
}

export default AdminNavbar
