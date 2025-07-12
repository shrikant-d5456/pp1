import axios from 'axios';
import { BsPlugFill, BsPlusCircle, BsPlusCircleFill, BsTrash, BsTrash2 } from 'react-icons/bs'
import React, { useContext, useEffect, useState } from 'react';
import { URL } from '../url';
import { UserContext } from '../Utils/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [title, setTitle] = useState("");
    const [img, setimg] = useState("");
    const [desc, setDesc] = useState("");
    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState("");
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { id: postId } = useParams();

    const addCategory = () => {
        setCats([...cats, cat]);
        setCat("");
    };

    const deleteCategory = (i) => {
        setCats(cats.filter((_, index) => index !== i));
    };

    const getPost = async () => {
        try {
            const resp = await axios.get(`http://localhost:8000/auth/post/${postId}`);
            const fetchedPost = resp.data.data;
            setPost(fetchedPost);
            setTitle(fetchedPost.title);
            setimg(fetchedPost.img);
            setDesc(fetchedPost.desc);
            setCats(fetchedPost.categories);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPost();
    }, [postId]);

    const uploadPost = async () => {
        try {
            const updatedPost = { title, img, desc, categories: cats };
            const resp = await axios.put(`http://localhost:8000/auth/post/${postId}`, updatedPost);
            // console.log(resp);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex flex-col gap-4 w-full m-auto  pt-20 lg:text-base text-sm'>
            <div className='flex flex-col lg:w-1/2 w-full m-auto gap-4 p-8 border bg-sky-100 border-[#89e2f0]'>
                <h1 className=' text-2xl font-semibold my-2 text-gray-800'>Edit Post</h1>

                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='inp' />

                <input
                    value={img}
                    onChange={(e) => setimg(e.target.value)}
                    type='text'
                    placeholder='Enter image URL or base64 string'
                    className='inp'
                />

                <div className='flex justify-between items-center'>
                    <input
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        type="text"
                        placeholder='Enter Category'
                        className='inp w-full'
                    />
                    <button onClick={addCategory} className=' px-4 flex justify-center items-center text-white gap-2 bg-black py-2 border-2'> <BsPlusCircleFill/> </button>
                </div>

                <div className='flex flex-wrap gap-4'>
                    {cats?.map((c, index) => (
                        <div key={index} className='flex gap-2'>
                            <p className='w-fit px-4 py-1 my-2 bg-white shadow rounded-full font-normal'>{c}</p>
                            <button onClick={() => deleteCategory(index)}><BsTrash/></button>
                        </div>
                    ))}
                </div>

                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    cols={10}
                    rows={5}
                    className='inp'
                />

                <button onClick={uploadPost} className='btn1'>Upload Post</button>
            </div>
        </div>
    );
};

export default EditPost;