import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Utils/UserContext.jsx';
import Comment from './Comment.jsx';
import { BsBookmarkPlus, BsBookmarkPlusFill, BsMicMuteFill, BsPauseBtnFill, BsSignStopFill, BsSoundwave, BsYoutube } from 'react-icons/bs';
import AdminIDs from "../Utils/AdminIDs.jsx";
import Lang from '../components/Lang.jsx';
import Email from '../components/Email.jsx';
import PostCard from './PostCard.jsx';
import { toast } from 'react-toastify';
import PostCardForFilter from './PostCardForFilter.jsx';
const PostDetails = () => {
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [valid, setValid] = useState(false);
  const [check, setCheck] = useState(false);
  const [admin, setAdmin] = useState("");
  const [validator, setValidator] = useState("");
  const [checked, setChecked] = useState("");
  const [ttsState, setTtsState] = useState("idle"); // "idle", "playing", "paused"

  const { id } = useParams();
  console.log('postId', id);
  const { user } = useContext(UserContext);
  console.log('user id', user.id)

  const navigate = useNavigate();

  const [targetLang, setTargetLang] = useState('en');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const getPost = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/post/${id}`);
      setPost(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/hostData`);
      setPosts(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
    getPosts();
  }, [id]);

  useEffect(() => {
    if (post && user) {
      const adminIndex = AdminIDs.findIndex(admin => admin.id === user.id);
      if (adminIndex !== -1) {
        setValid(post[`validator${adminIndex}`] || false);
        setCheck(post[`checked${adminIndex}`] || false);
        setAdmin(`admin${adminIndex}`);
        setValidator(`validator${adminIndex}`);
        setChecked(`checked${adminIndex}`);
      }
    }
  }, [post, user]);

  const deletePost = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:8000/auth/post/${id}`);
        toast("Post deleted successfully");
        navigate('/admin/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateBy = async (isValid) => {
    try {
      await axios.put(`http://localhost:8000/auth/api/post/${admin}/${id}`, {
        [`${validator}`]: isValid ? "true" : "false",
      });
      setValid(isValid);
    } catch (err) {
      console.log(err);
    }
  };

  const checkedBy = async (checkStatus) => {
    try {
      await axios.put(`http://localhost:8000/auth/api/post/${admin}/${id}`, {
        [`${checked}`]: checkStatus ? "true" : "false",
      });
      setCheck(checkStatus);
      toast("Thank you for validation");
      navigate('/admin/');
    } catch (err) {
      console.log(err);
    }
  };

  const generateSummary = async () => {
    if (!post?.desc) {
      toast.warn('Post description is empty!');
      return;
    }

    setLoadingSummary(true);
    try {
      const cleanedText = post.desc.replace(/<[^>]+>/g, '');

      const response = await axios.post('http://localhost:8000/api/summary/summarize', {
        text: cleanedText,
      });

      setSummary(response.data.summary || 'No summary generated.');
    } catch (error) {
      console.error('Summary Error:', error);
      toast.error('Error generating summary!');
    } finally {
      setLoadingSummary(false);
    }
  };


  const [saved, setSaved] = useState(false);
  const [postId, setPostId] = useState(id);
  const [userID, setUserId] = useState(user.id);

  const checkIfPostIsSaved = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/auth/user/${user.id}`);
      const savedIds = res.data.data.savedPosts.map(post => typeof post === 'string' ? post : post._id);
      setSaved(savedIds.includes(id));
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };
  useEffect(() => {
    if (user?.id) {
      checkIfPostIsSaved();
    }
  }, [id, user]);


  const handleSave = async (userID, postId) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/post/user/savepost', {
        userId: userID,
        postId: postId,
      });
      console.log(res.data);
      toast.success("Post saved successfully!");
      setSaved(true); // or call checkIfPostIsSaved() if needed
    } catch (err) {
      console.error('Error saving post:', err);
      toast.error(err?.response?.data?.msg || "Error saving post.");
    }
  };



  const [active, setActive] = useState({ play: false, pause: false, resume: false, close: false });

  // Text-to-speech
  const synth = window.speechSynthesis;
  const handleSpeak = () => {
    if (synth.speaking) synth.cancel();
    setActive({ play: true })
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(post.desc.replace(/<[^>]+>/g, ''));
      utterance.lang = { mr: 'mr-IN', fr: 'fr-FR', es: 'es-ES', en: 'en-US' }[targetLang];
      synth.speak(utterance);
    } else {
      toast('Text-to-speech not supported in your browser');
    }
  };
  const handlePause = () => { synth.pause(); setActive({ pause: true }) }
  const handleResume = () => { synth.resume(); setActive({ resume: true }) }
  const handleStop = () => { synth.cancel(); setActive({ close: true }) }

  let validation_length = 0;
  validation_length =
    (post.validator1 && 1) + post.validator2 + post.validator3 + post.validator4 + post.validator5;

  return (
    <div className='lg:w-full lg:px-4 px-4 sm:flex m-auto bg-white pt-4'>
      <div className={`md:w-3/4 ${AdminIDs.some(admin => admin.id === user?.id && "w-full")} w-full`}>
        <div className=' relative w-full bg-transparent text-black'>

          <div className=' w-full absolute z-50'>
            {user?.id === AdminIDs[0]?.id && (
              <div className=' w-full flex justify-between items-center'>
                <div>
                  <div className='flex justify-end gap-[1px] m-2'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`${post[`validator${i + 1}`] ? 'bg-green' : 'bg-red-600'} w-6 h-2 rounded-sm`} />
                    ))}
                  </div>
                  <div className='flex justify-end gap-[1px]'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`${post[`checked${i + 1}`] ? 'bg-yellow-400' : 'bg-red-500'} w-6 h-2 rounded-sm`} />
                    ))}
                  </div>
                </div>
                <div>
                  <button onClick={deletePost} className=' bg-red-500 px-4 py-2 text-white font-semibold mx-4 my-2'>Delete</button>
                </div>
              </div>
            )}
          </div>

          <div className=' relative bg-no-Img-found'>
            <img loading="lazy" src={post?.img}  className=' h-[500px] w-full object-cover' />
            <button
              className=" bottom-5 bg-white/80 right-0 absolute flex justify-center items-center gap-2 text-sm border  py-2 px-4 mt-2"
              onClick={() => handleSave(user.id, id)}
            >
              {saved ? <BsBookmarkPlusFill className="text-sm" /> : <BsBookmarkPlus className="text-sm" />}
              {saved ? 'Post saved' : 'Save Post'}
            </button>
          </div>
          <div className=' flex flex-wrap justify-between'>
            <div>
              <p className='text-sm font-extrabold bg-green text-white w-fit px-4 py-1 rounded-full my-4'>
                Published by @{post.username}
              </p>
            </div>

            <div className=' flex justify-center items-center gap-4'>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="border p-2 rounded-md float-end mt-2">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 my-2">
            <Lang translateWord={post.title} targetLang={targetLang} />
          </h1>

          <div className='flex flex-wrap gap-2 font-semibold'>Tags:
            {post.categories?.map((tag, i) => (
              <p key={i} className='px-4 py-1 text-sm rounded-full bg-green text-white'>
                <Lang translateWord={tag} targetLang={targetLang} />
              </p>
            ))}
          </div>

          <p className='text-sm my-2 font-semibold'>Upload Date : <span className='font-light text-sm'>{post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'No date available'}</span></p>

          {post.places && (
            <p className='text-sm font-semibold mb-2'>Place of Origin :
              <span className='font-light '> <Lang translateWord={post.places} targetLang={targetLang} /></span>
            </p>
          )}

          {post.wpmh && (
            <p className='text-sm font-semibold'>Precaution :
              <span className='text-red-800'> <Lang translateWord={post.wpmh} targetLang={targetLang} /></span>
            </p>
          )}

          {post.desc && (
            <div className='border-l-4 mt-4 border-green-500 pl-4  p-2 text-justify text-sm prose max-w-none'>
              <Lang translateWord={post.desc.replace(/<[^>]+>/g, '')} targetLang={targetLang} />
            </div>
          )}

          <div className=' flex justify-between items-center my-4'>
            <div>
              <button onClick={generateSummary} className='px-4 py-2 mt-2 rounded-full bg-green-500 text-white'>
                {loadingSummary ? 'Summarizing...' : 'Generate Summary'}
              </button>
            </div>
            <div className=' flex gap-4 bg-green-200 text-white p-2 rounded-full'>
              {ttsState === "idle" && (
                <button
                  className='p-1 rounded-full bg-white text-green-800 '
                  onClick={() => { handleSpeak(); setTtsState("playing"); }}>
                  <BsSoundwave />
                </button>
              )}

              {ttsState === "playing" && (
                <button
                  className='p-1 rounded-full bg-white text-green-800 '
                  onClick={() => { handlePause(); setTtsState("paused"); }}>
                  <BsPauseBtnFill />
                </button>
              )}

              {ttsState === "paused" && (
                <button
                  className='p-1 rounded-full bg-white text-green-800 '
                  onClick={() => { handleResume(); setTtsState("playing"); }}>
                  <BsMicMuteFill />
                </button>
              )}

              {(ttsState === "playing" || ttsState === "paused") && (
                <button
                  className='p-1 rounded-full bg-white text-green-800 '
                  onClick={() => { handleStop(); setTtsState("idle"); }}>
                  <BsSignStopFill />
                </button>
              )}
            </div>

          </div>

          {summary && (
            <div className="my-4 p-4 bg-gray-100 border-l-4 border-green-500">
              <h2 className="font-bold text-green-700 mb-2">Summary:</h2>
              <p className="text-sm text-gray-800">
                <Lang translateWord={summary} targetLang={targetLang} />
                </p>
            </div>
          )}

          {post.ingredient && (
            <div className='font-semibold my-2'>Ingredients:
              <div>
                {post.ingredient.map((d, i) => (
                  <p key={i} className='flex items-center gap-2 text-sm font-normal'>
                    <input type="checkbox" />
                    <Lang translateWord={d} targetLang={targetLang} />
                  </p>
                ))}
              </div>
            </div>
          )}

          {post.step && (
            <div className='font-semibold my-4'>Steps:
              {post.step.map((d, i) => (
                <div key={i} className='flex items-center gap-2 mb-2'>
                  <span className='bg-green text-sm text-white px-2 rounded-full'>{i + 1}</span>
                  <Lang translateWord={d} targetLang={targetLang} />
                </div>
              ))}
            </div>
          )}

          {post.video_link && (
            <div className='flex items-center text-sm font-semibold mt-4'>
              <span>Video link:</span>
              <a
                href={post?.video_link}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2 ml-2 bg-red-500 px-4 py-1 rounded-full text-white'
              >
                <BsYoutube /> See Video
              </a>
            </div>

          )}

          {(user && AdminIDs.some(admin => admin.id === user.id)) && (
            <div className="w-full p-4  my-6 bg-[#bdffa9] shadow-md">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Email username={post.username} userEmail={post.email} validation_length={validation_length} />
                <span className="text-sm text-center w-full text-gray-600">You can change your validation anytime.</span>
              </div>

              {/* Validation Buttons */}
              <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
                <button
                  onClick={() => validateBy(true)}
                  className={`px-5 py-2 rounded-full text-white transition-all duration-300 
        ${valid ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'}
      `}
                >
                  {valid ? "Yes! ✓" : "Yes"}
                </button>

                <button
                  onClick={() => validateBy(false)}
                  className={`px-5 py-2 rounded-full text-white transition-all duration-300 
        ${!valid ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'}
      `}
                >
                  {!valid ? "No ✓" : "No"}
                </button>

                <button
                  onClick={() => checkedBy(!check)}
                  className={`px-5 py-2 rounded-full text-white transition-all duration-300 
        ${check ? 'bg-yellow-700 hover:bg-yellow-800' : 'bg-yellow-500 hover:bg-yellow-600'}
      `}
                >
                  {check ? "Checked! ✓" : "Check & Close"}
                </button>
              </div>
            </div>

          )}
        </div>

        <Comment post={post} />
      </div>

      {!AdminIDs.some(admin => admin.id === user?.id) && (
        <div className='w-1/4 md:block hidden overscroll-y-scroll'>
          {/* <p className='pl-6 font-bold '>Also check these posts</p> */}
          {posts.map(p => (
            <div key={p._id} className=' pl-4' >
              <Link to={`/posts/post/${p._id}`}>
                <PostCardForFilter post={p} hovereffect={false} />
              </Link>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default PostDetails;
