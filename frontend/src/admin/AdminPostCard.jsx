import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Utils/UserContext.jsx';
import { Link } from 'react-router-dom';
import AdminIDs from '../Utils/AdminIDs.jsx';

const PostCard = ({ post }) => {

  const { user } = useContext(UserContext);

  let userType;

  if(user?.username === "admin"){
    userType="admin";
  }
  else{
    userType="";
  }


  return (
    <>
      <div key={post._id} className='w-full relative'>
        {
        userType === "admin" ?
          <button className='absolute top-1 m-4 cursor-auto bg-green px-4 py-1 text-sm text-white font-semibold'
          >
          {(post.validator1 && post.validator2 && post.validator3 && post.validator4 && post.validator5)? "uploaded":"uploading.."}</button>
          : ""
        }

        <Link key={post._id} to={user ? `/admin/post/${post._id}` : "/login"}>
          <div className='w-full m-auto bg-white p-4 border-[1px] border-gray-200 rounded-md'>
            <div>
              <img loading="lazy" className='w-full h-[150px]' src={post.img} alt="" />
            </div>

            {user.id === AdminIDs[0].id || AdminIDs[1].id || AdminIDs[2].id || AdminIDs[3].id|| AdminIDs[4].id || AdminIDs[5].id ?
              <div className='flex justify-end gap-[1px] mt-2'>
                {post.validator1 === true ? <div className='bg-green rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-600 rounded-sm w-6 h-2 my-[1px]' />}
                {post.validator2 === true ? <div className='bg-green rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-600 rounded-sm w-6 h-2 my-[1px]' />}
                {post.validator3 === true ? <div className='bg-green rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-600 rounded-sm w-6 h-2 my-[1px]' />}
                {post.validator4 === true ? <div className='bg-green rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-600 rounded-sm w-6 h-2 my-[1px]' />}
                {post.validator5 === true ? <div className='bg-green rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-600 rounded-sm w-6 h-2 my-[1px]' />}
              </div> : ""}
            {user.id === AdminIDs[0].id || AdminIDs[1].id || AdminIDs[2].id || AdminIDs[3].id|| AdminIDs[4].id || AdminIDs[5].id ?
              <div className='flex justify-end gap-[1px]'>
                {post.checked1 === true ? <div className='bg-yellow-400 rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-500 rounded-sm w-6 h-2 my-[1px]' />}
                {post.checked2 === true ? <div className='bg-yellow-400 rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-500 rounded-sm w-6 h-2 my-[1px]' />}
                {post.checked3 === true ? <div className='bg-yellow-400 rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-500 rounded-sm w-6 h-2 my-[1px]' />}
                {post.checked4 === true ? <div className='bg-yellow-400 rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-500 rounded-sm w-6 h-2 my-[1px]' />}
                {post.checked5 === true ? <div className='bg-yellow-400 rounded-sm w-6 h-2 my-[1px]' /> : <div className='bg-red-500 rounded-sm w-6 h-2 my-[1px]' />}
              </div> : ""}

            <div>
              <h1 className='font-medium text-sm my-1 line-clamp-1'>{post.title}..</h1>
              <span>
                <p className=' text-xs text-gray-500 my-1'>@{post.username}</p>
                <p className=' text-xs text-gray-400 my-1'>{post.updatedAt}</p>
              </span>
              <div className=' text-xs text-gray-500 my-1 line-clamp-1' dangerouslySetInnerHTML={{ __html: post.desc }}></div>
            </div>


          </div>
        </Link>

      </div>
    </>
  )
}

export default PostCard
