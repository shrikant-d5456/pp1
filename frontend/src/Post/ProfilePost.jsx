import axios from 'axios'; 
import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url';
import { UserContext } from '../Utils/UserContext';
import { Link } from 'react-router-dom';

const ProfilePost = () => {
  
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const getPosts = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/post`);
      setPosts(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const userPosts = posts.filter(post => post.userId === user.id);

  return (
    <>
      {userPosts.length > 0 ? (
        userPosts.map((post, index) => (
          <Link key={index} to={post.validator1 && post.validator2 &&post.validator3 &&post.validator4 &&post.validator5 ? `/posts/post/${post._id}`:`/posts/post/post-validatation/${post._id}`} className='lg:w-1/3 border-[1px] border-gray-200 bg-white p-4 shadow text-sm '>
          <div key={index} className=' w-full' >
            <img loading="lazy" className='w-full h-[150px]' src={post.img} alt="" />
            <h1 className='text-justify my-2 font-semibold text-gray-800 line-clamp-2'>{post.title}</h1>
            <div className=' my-2 text-gray-600 text-justify line-clamp-2'>
              <div
                className=' text-gray-800  text-sm text-justify prose max-w-none'
                dangerouslySetInnerHTML={{ __html: post.desc }}
              />..Read More</div>
          </div>
          </Link>
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
};

export default ProfilePost;
