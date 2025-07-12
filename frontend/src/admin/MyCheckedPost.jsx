import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../url.js';
// import { Link } from 'react-router-dom';
import { UserContext } from '../Utils/UserContext.jsx';
import AdminPostCard from './AdminPostCard.jsx';
import AdminIDs from '../Utils/AdminIDs.jsx';

const MyCheckedPost = () => {

  const [posts, setposts] = useState([]);
  const { user } = useContext(UserContext);

  const getposts1 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator1-checked-post`);
      setposts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts2 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator2-checked-post`);
      setposts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts3 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator3-checked-post`);
      setposts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts4 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator4-checked-post`);
      setposts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts5 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator5-checked-post`);
      setposts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if(user.id === AdminIDs[1].id){
        getposts1();
    }
    if(user.id === AdminIDs[2].id){
        getposts2();
    }
    if(user.id === AdminIDs[3].id){
        getposts3();
    }
    if(user.id === AdminIDs[4].id){
        getposts4();
    }
    if(user.id === AdminIDs[5].id){
        getposts5();
    }
  });

  

  return (
    <div>
      <div className='w-full flex flex-wrap lg:justify-start justify-center items-center m-auto '>
        {posts.map((post, index) => (
         <div key={index} className='lg:w-1/4'>
              <AdminPostCard key={post._id} post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCheckedPost

