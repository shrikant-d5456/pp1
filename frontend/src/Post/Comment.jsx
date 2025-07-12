import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url';
import { UserContext } from '../Utils/UserContext';
import axios from 'axios';
import { BsBoxArrowInUpLeft, BsPencilSquare, BsSend, BsSendCheckFill, BsTrash3Fill } from "react-icons/bs";

const Comment = ({ post }) => {
  const { user } = useContext(UserContext);

  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);
  const [err, setError] = useState(false)

  useEffect(() => {
    if (post && user) {
      setPostId(post._id);
      setUserId(user.id);
    }
  }, [post, user]);

  const sendComment = async () => {
    try {
      if (comment.trim() !== "") {
        await axios.post(`http://localhost:8000/auth/comment/create`, {
          comment,
          author: user.username,
          postId,
          userId,
        });
        setComment("");
        getComment();
        setError(false)
      }
      else {
        setError(true)
      }
    } catch (err) {
      console.log(err);
    }

  };

  const getComment = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/comment/post/${postId}`);
      setData(Array.isArray(resp.data.data) ? resp.data.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8000/auth/comment/${commentId}`);
      getComment();
    } catch (err) {
      console.log(err);
    }
  };

  const updateComment = async () => {
    try {
      if (comment.trim() !== "") {
        await axios.put(`http://localhost:8000/auth/comment/${editComment._id}`, {
          comment,
          author: user.username,
          postId,
          userId,
        });
        setEditComment(null);
        setComment("");
        getComment();
        setError(false);
      }
      else {
        setError(true);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComment();
  }, [postId]);


  const startEditing = (comment) => {
    setEditComment(comment);
    setComment(comment.comment);
  };

  return (
    <div className=' my-4 text-sm'>
      <p className='text-xl font-semibold my-4'>Comments</p>
      {err && <p className=' bg-yellow-200 w-full font-semibold rounded-sm text-gray-800 p-2 my-2'>error while analysing</p>}
      <div className='flex w-full p-2 border justify-between items-center border-gray-400'>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='outline-none w-full bg-transparent'
          placeholder='Enter Comment..'
        />
        {editComment ? 
        <button onClick={updateComment}><BsSendCheckFill /></button>
        :
        <button onClick={sendComment}><BsSend /></button>
        }
      </div>

      {Array.isArray(data) && data.map((element) => (
        element.postId === post._id && (
          <div key={element._id} className=' bg-slate-200 px-4 py-1 rounded-sm my-4'>
            <div className='flex justify-end items-center my-2'>
              {user.username === element.author ?
                <>
                  <button onClick={() => startEditing(element)} className='btn1'>
                    <BsPencilSquare />
                  </button>
                  <button onClick={() => deleteComment(element._id)} className='btn1'>
                    <BsTrash3Fill />
                  </button>
                </> : ""}

            </div>
            <div className='flex justify-between items-center'>
              <p>@{element.author}</p>
              <p className=' text-sm text-gray-400'>{new Date(element.createdAt).toLocaleString()}</p>
            </div>
            <p className='p-2 rounded-sm my-2'>
              {element.comment}
            </p>
          </div>
        )
      ))}
    </div>
  );
};

export default Comment;
