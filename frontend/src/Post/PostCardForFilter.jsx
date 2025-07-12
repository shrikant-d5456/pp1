import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Utils/UserContext.jsx';
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';

const PostCardForFilter = ({ post, hovereffect=true },  hover ) => {

  const { user } = useContext(UserContext);
  console.log(post);

  let userType;

  if (user?.username === "admin") {
    userType = "admin";
  }
  else {
    userType = "";
  }


  const updatedAtDate = new Date(post.updatedAt);

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200; // Average reading speed
    const words = text.trim().split(/\s+/).length; // Count words
    const readingTime = Math.ceil(words / wordsPerMinute); // Time in minutes
    return readingTime;
  };

  // const hostPost = async () => {
  //   try {
  //     const resp = await axios.post(`http://localhost:8000/auth/api/post/admin/postData/${post._id}`);
  //     console.log(resp.msg);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <div key={post._id} className='w-full overflow-hidden'>
        {userType === "admin" ?
          <button className='absolute group m-4 cursor-auto bg-green-500 px-4 py-1 text-white font-semibold'
          >{(post.validator1 && post.validator2 && post.validator3 && post.validator4 && post.validator5) ? "uploaded" : "uploading.."}</button>
          : ""}
        <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
          <div className="relative group bg-white cursor-pointer shadow-md overflow-hidden hover:shadow-xl transition duration-300 p-1 border border-gray-100  mr-[1px] "
          >
            {hover && hovereffect &&
            <div className=" text-xs z-20 absolute inset-0 bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out shadow-md overflow-y-auto max-h-96 justify-center items-center flex-col flex-wrap p-8">
              This post related to following category <br />
              <div className='flex flex-wrap'>
                {post.categories?.map((d, i) => (
                <p key={i} className=' w-fit px-2 py-1  rounded-full font-semibold border-2 bg-green text-white text-nowrap mt-2'> {d} </p>
                
              ))}
              </div>
              <hr className=' mt-2 border-green-500' />
              <p className=' mt-2 ' dangerouslySetInnerHTML={{ __html: post.desc }}/>
           
            </div>}

            <div className=' relative'>
              <p className=" textsm absolute flex z-10 top-1 right-1 w-fit justify-end bg-white/60  p-2  rounded-full items-center gap-1 text-xs text-right ">
                <BsEye className="" />
                <span>{calculateReadingTime(post.desc)} min </span>
              </p>
              <img loading="lazy" className='w-full h-[200px]' src={post.img} alt="" />
             
              <h1 className=' w-full text-sm bg-black/40 absolute font-medium line-clamp-2 text-white bottom-0 p-2 '>{post.title}..</h1>
           
            </div>

            


          </div>
          
        </Link>

      </div>
    </>
  )
}

export default PostCardForFilter
