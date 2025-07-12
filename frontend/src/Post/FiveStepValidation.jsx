import React, { useEffect, useState } from 'react'
import { BsCheckCircleFill, BsSearch } from "react-icons/bs"
import { useParams } from 'react-router-dom';
import {URL} from "../url"
import axios from 'axios';
import {toast} from 'react-toastify';
const FiveStepValidation = () => {

    const postId = useParams()
    const [post, setposts] = useState([]);

    const getPost = async () => {
        try {
          const resp = await axios.get(URL+`/auth/post/${postId.id}`);
          console.log(resp.data.data)
          setposts(resp.data.data);
        //   console.log(user.id + "hello" + post.userId)
        } catch (err) {
          console.log(err)
        }
      }
    
      useEffect(() => {
        getPost();
      },[postId])
    const researcher = [
        {
            step: 1,
            display: post?.validator1 || false,
            loading: !post?.validator1,
            img: "https://static.vecteezy.com/system/resources/previews/015/414/017/non_2x/woman-scientist-chemical-researcher-with-microscope-atom-a-molecule-of-organic-substance-a-fragment-of-a-dna-chain-experiment-concept-illustration-vector.jpg",
            Reserch: "Resercher 1",
        },
        {
            step: 2,
            display: post?.validator2 || false,
            loading: !post?.validator2,
            img: "https://static.vecteezy.com/system/resources/previews/015/414/017/non_2x/woman-scientist-chemical-researcher-with-microscope-atom-a-molecule-of-organic-substance-a-fragment-of-a-dna-chain-experiment-concept-illustration-vector.jpg",
            Reserch: "Resercher 2",
        },
        {
            step: 3,
            display: post?.validator3 || false,
            loading: !post?.validator3,
            img: "https://static.vecteezy.com/system/resources/previews/015/414/017/non_2x/woman-scientist-chemical-researcher-with-microscope-atom-a-molecule-of-organic-substance-a-fragment-of-a-dna-chain-experiment-concept-illustration-vector.jpg",
            Reserch: "Resercher 3",
        },
        {
            step: 4,
            display: post?.validator4 || false,
            loading: !post?.validator4,
            img: "https://static.vecteezy.com/system/resources/previews/015/414/017/non_2x/woman-scientist-chemical-researcher-with-microscope-atom-a-molecule-of-organic-substance-a-fragment-of-a-dna-chain-experiment-concept-illustration-vector.jpg",
            Reserch: "Resercher 4",
        },
        {
            step: 5,
            display: post?.validator5 || false,
            loading: !post?.validator5,
            img: "https://static.vecteezy.com/system/resources/previews/015/414/017/non_2x/woman-scientist-chemical-researcher-with-microscope-atom-a-molecule-of-organic-substance-a-fragment-of-a-dna-chain-experiment-concept-illustration-vector.jpg",
            Reserch: "Resercher 5",
        },

    ];

    return (
        <>
            <div>
                <h1 className=' font-bold text-2xl text-gray-600 my-4 text-center mt-4'>Your Post Analysing by Reasearcher</h1> <hr />
            </div>

            <div className='w-full lg:m-auto lg:w-8/12 flex justify-center items-center'>
                
                {researcher.map((ele, index) => (
                        <div className={`${!ele.loading || "animate-pulse"} ${ele.display || "opacity-40"} flex justify-center items-center my-8`}>
                            <div className='flex justify-center items-center w-[50px] h-[50px] bggr border-4 border-green-500 rounded-full '>
                            <p className={`${!ele.loading || "animate-ping"} text-green-500 font-bold text-4xl absolute`}>{!ele.loading === true ? <BsCheckCircleFill/>: ""}</p>
                                <p className=' font-semibold text-gray-500'>{ele.step}</p>
                            </div>
                            {researcher.length !== index+1 ? <span className=' w-[40px] border-2 border-green-500'></span> :""}
                        </div>
                    ))
                }
            </div>

            <div className='  w-full flex justify-center flex-wrap items-center lg:m-auto'>
                {researcher.map((ele, index) => (
                        <div key={index} className={` ${ele.display || "opacity-40"}  w-[200px] h-[200px]  flex flex-col justify-center items-center mx-14 my-4 border-8 border-green-500   rounded-full p-8 `}>
                            <p className={`${!ele.loading || "animate-ping"} text-green-500 font-bold text-4xl absolute`}>{!ele.loading === true ? <BsCheckCircleFill/>: < BsSearch/>}</p>
                            <img
                                className=' w-[200px] h-[200px] rounded-full'
                                src={ele.img} alt="" />
                            <p className=' my-2 font-semibold'>{ele.Reserch}</p>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default FiveStepValidation