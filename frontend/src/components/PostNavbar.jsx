import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { URL } from '../url.js';
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../Utils/UserContext.jsx';
import { BsBag, BsFilePost, BsList, BsPersonAdd, BsPersonDashFill, BsPerson, BsSearch, BsX, BsHeart, BsBagHeartFill, BsStickiesFill, BsStickies } from 'react-icons/bs';
import logo from "../../assets/logo.jpeg"
import { wellnessQuotes } from '../Data/Quotes.jsx';
import {toast} from 'react-toastify';

const PostNavbar = () => {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [menu, setmenu] = useState(false);

  const handlelogout = async () => {
    const ans = toast.warn(confirm("you want to logout 🤔"));
    if (ans) {
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

  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearch(keyword);

    if (keyword.length === 0) {
      setPosts([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(URL + `/auth/post/search`, { search: keyword });
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const [msg, setMsg] = useState('');
  const [isOpen, setisOpen] = useState(true);

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setMsg("Good Morning 🌅");
    } else if (currentHour < 17) {
      setMsg("Good Afternoon ☀️");
    } else if (currentHour < 21) {
      setMsg("Good Evening 🌇");
    } else {
      setMsg("Good Night 🌙");
    }
  }, []);


  return (
    <header>
      <div className='fixed top-0 z-50 w-full bg-white '>

        <div className=' w-full bg-green text-white font-semibold text-center p-2 overflow-hidden'>
          <p className=' line-clamp-1 text-sm animate-pulse transition-transform ease-in-out '>✨ { wellnessQuotes[Math.floor(Math.random() * 5) + 1]}</p>
        </div>

        <div className='flex justify-between items-center p-4'>
          <Link to="/">
            <div className=' w-40'><img loading="lazy" src={logo} alt="logo" />
            </div></Link>


          <div className='  z-10 absolute top-11 right-14'>
            {menu &&
              <div className=' bg-white rounded-md border-[1px] border-gray-200 flex flex-col py-2 px-8 gap-2 '>

                {!user &&
                  <span className='flex gap-2 justify-center items-center hover:text-green-800 cursor-pointer' onClick={() => navigate("/login")}><BsPersonAdd />Login</span>
                }
                {user &&
                  <>
                    
                    <Link to="/profile">
                      <span onClick={() => setmenu(false)} className='text-sm flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                        <BsPerson />
                        Profile
                      </span>
                    </Link>

                    <Link to="/createpost">
                      <span onClick={() => setmenu(false)} className='text-sm flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                        <BsFilePost />
                        Create
                      </span>
                    </Link>
                    <Link to="/save-post">
                      <span onClick={() => setmenu(false)} className='text-sm flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                        <BsStickies/>
                        Save Post
                      </span>
                    </Link>
                  <span onClick={handlelogout} className=' w-full flex gap-2  items-center hover:text-green-800 cursor-pointer'><BsPersonDashFill />Logout</span>

                  </>}

              </div>
            }
          </div>

          <div>
            <button className='lg:hidden block bg-white text-xl  p-2 ' onClick={() => setmenu(!menu)}>{menu ? <BsX /> : <BsList />}</button>
            <div className=' lg:flex hidden py-2 px-8 gap-8 '>
              {!user &&
                <span className='text-sm flex gap-2 justify-center items-center hover:text-green-800 cursor-pointer' onClick={() => navigate("/login")}><BsPersonAdd />Login</span>
              }
              {user &&
                <>
                  <Link to="/profile">
                    <span onClick={() => setmenu(false)} className='text-sm flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                      <BsPerson />
                      Profile
                    </span>
                  </Link>

                  <Link to="/createpost">
                    <span onClick={() => setmenu(false)} className=' text-sm flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                      <BsFilePost />
                      Create
                    </span>
                  </Link>

                  <Link to="/save-post">
                      <span onClick={() => setmenu(false)} className='text-sm flex gap-2 items-center hover:text-green-800 cursor-pointer'>
                        <BsStickies/>
                        Save Post
                      </span>
                    </Link>

                  <span onClick={handlelogout} className='text-sm flex gap-2 justify-center items-center hover:text-green-800 cursor-pointer'><BsPersonDashFill />Logout</span>
                </>}
            </div>
          </div>
        </div>
      </div>

      <div className=' h-24'></div>
      {/* Loading Indicator */}
      {/* {loading && <p>Loading...</p>} */}

      {/* Display Posts
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => <PostCard key={post._id} post={post} />)
        ) : (
          !loading && <p>No posts found.</p>
        )}
      </div> */}

    </header>
  )
}

export default PostNavbar
