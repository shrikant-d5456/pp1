import axios from 'axios'; 
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Utils/UserContext';
import PostCard from './PostCard';

const SavePost = () => {
  const [posts, setPosts] = useState([]);
  const [saveposts, setSavePosts] = useState([]);
  const [matchedPosts, setMatchedPosts] = useState([]);
  const { user } = useContext(UserContext);

  // Fetch saved post IDs
  const getUserSavedPosts = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/user/${user.id}`);
      setSavePosts(resp.data.data.savedPosts); // array of saved post IDs
    } catch (err) {
      console.error('Error fetching saved posts:', err);
    }
  };

  // Fetch all hostData posts
  const getPosts = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/hostData`);
      setPosts(resp.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Filter posts based on saved IDs
  useEffect(() => {
    if (posts.length > 0 && saveposts.length > 0) {
      const filtered = posts.filter(post =>
        saveposts.includes(post._id.toString())
      );
      setMatchedPosts(filtered);
    }
  }, [posts, saveposts]);

  // Initial fetch
  useEffect(() => {
    getPosts();
    getUserSavedPosts();
  }, []);

  return (
    <div className='w-10/12 m-auto  grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 justify-start mb-8'>
      {matchedPosts.length > 0 ? (
        matchedPosts.map(post => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p className='text-center w-full'>No saved posts found.</p>
      )}
    </div>
  );
};

export default SavePost;