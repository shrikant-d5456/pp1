import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../Utils/UserContext';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircleFill, BsXCircle } from 'react-icons/bs';
import Select from '../components/Select';
import { toast } from 'react-toastify';

const Createpost = () => {
    const { user } = useContext(UserContext);
    const usenavigate = useNavigate();
    const ingredientFocus = useRef(0);

    const [mainCategory, setMainCategory] = useState("");
    const [isMainCategorySelected, setIsMainCategorySelected] = useState(false);
    const [tagOptions, setTagOptions] = useState([]);

    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);
    const [ingredient, setIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [step, setStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [desc, setDesc] = useState("");
    const [established, setEstablished] = useState("");
    const [places, setPlaces] = useState("");
    const [wpmh, setWpmh] = useState("");
    const [vitamin, setVitsmin] = useState("");
    const [video_link, setVideo_link] = useState("");

    const tagOptionsMap = {
        'Ancient Remedies': [
            'skin', 'cough', 'fever', 'diabetes', 'hair', 'diet',
            'immunity-wellness', 'pain-reliever', 'juices'
        ],
        'Wild Vegetables': [
            'leafy-greens', 'forest-edibles', 'seasonal-plants',
            'anti-inflammatory', 'detoxifying', 'immunity-boosters',
            'fiber-rich', 'antioxidants', 'rare-herbs', 'tribal-usage',
            'iron-rich', 'wild-roots', 'bitter-tonics', 'cooling-effects'
        ]
    };

    const addCategory = () => {
        if (!cat.trim()) return toast.warn("Tag can't be empty!");
        if (cats.includes(cat)) return toast.info("Tag already added!");
        setCats([...cats, cat]);
        setCat("");
    };

    const deleteCategory = (i) => setCats(cats.filter((_, index) => index !== i));
    const addIngredient = () => {
        if (!ingredient.trim()) return toast.warn("Ingredient can't be empty!");
        setIngredients([...ingredients, ingredient]);
        setIngredient("");
        ingredientFocus.current.focus();
    };

    const deleteIngredient = (i) => setIngredients(ingredients.filter((_, index) => index !== i));
    const addStep = () => {
        if (!step.trim()) return toast.warn("Step can't be empty!");
        setSteps([...steps, step]);
        setStep("");
    };

    const deleteStep = (i) => setSteps(steps.filter((_, index) => index !== i));

    const validateForm = () => {
        if (!user?.id) return toast.error("Please login to create a post!") && false;
        if (
            !mainCategory.trim() || !title.trim() || !img.trim() || !desc.trim() ||
            !established || !places.trim() || !wpmh.trim() || !vitamin.trim() ||
            ingredients.length === 0 || steps.length === 0 || cats.length === 0
        ) {
            toast.error("Please fill out all required fields.");
            return false;
        }
        return true;
    };

    const uploadPost = async () => {
        if (!validateForm()) return;

        try {
            const payload = {
                title,
                desc,
                img,
                username: user.username,
                email: user.email,
                category: mainCategory,
                categories: cats,
                userId: user.id,
                established,
                places,
                wpmh,
                vitamin,
                ingredient: ingredients,
                step: steps,
                video_link,
            };
            await axios.post(`http://localhost:8000/auth/post/create`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            toast.success("Your post has been uploaded successfully!");
            usenavigate("/");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong while uploading!");
        }
    };

    const topHeading = mainCategory === "Ancient Remedies"
        ? "Ayurveda Blog: Create & Share Ancient Remedies"
        : mainCategory === "Wild Vegetables"
            ? "Ayurveda Blog: Document & Share Wild Vegetables Knowledge"
            : "Ayurveda Blog: Share Your Knowledge";

    const topSubText = mainCategory === "Wild Vegetables"
        ? "Contribute your Ayurvedic wisdom about wild herbs and vegetables with detailed ingredients and health benefits. Let the nature heal."
        : "Contribute your Ayurvedic wisdom with detailed ingredients, steps, and healing benefits. Empower others through the science of nature.";

    return (
        <div className='flex w-full lg:w-10/12 m-auto flex-col justify-center items-center text-center bg-[#c8ffb9] min-h-screen mb-10 shadow-lg'>

            {/* Top Banner Section */}
            <div className="w-full h-[300px] text-white p-4 flex flex-col justify-center items-center loginbgimg">
                <p className='text-3xl font-bold text-center'>{topHeading}</p>
                <p className='text-sm mt-5 max-w-2xl text-center'>{topSubText}</p>
            </div>

            {/* Form Section */}
            <div className='w-full  overflow-y-scroll flex flex-col gap-4 bg-white p-6 shadow-inner border-4 border-white'>

                <h1 className='text-xl text-center font-bold text-green'>Post Ayurvedic Knowledge</h1>

                {/* Main Category Selector */}
                <select
                    value={mainCategory}
                    onChange={(e) => {
                        const selected = e.target.value;
                        setMainCategory(selected);
                        setIsMainCategorySelected(true);
                        setTagOptions(tagOptionsMap[selected] || []);
                        setCats([]);
                    }}
                    style={{ color: "white" }}
                    disabled={isMainCategorySelected}
                    className=' font-bold inp text-sm bg-white-400 rounded-full outline-none w-fit text-center p-4 bg-green-900'
                >
                    <option className=' bg-white-400 rounded-full' value="">Select Main Category (Required)</option>
                    <option className=' bg-white-400 rounded-full' value="Ancient Remedies">Ancient Remedies</option>
                    <option className=' bg-white-400 rounded-full' value="Wild Vegetables">Wild Vegetables</option>
                </select>

                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Post title 💡' className='inp' />
                <input value={img} onChange={(e) => setImg(e.target.value)} type='text' placeholder='Image URL 🌿' className='inp' />
                <input value={video_link} onChange={(e) => setVideo_link(e.target.value)} type='text' placeholder='Video Link ▶️' className='inp' />
                <input value={established} onChange={(e) => setEstablished(e.target.value)} type='date' className='inp' />
                <input value={places} onChange={(e) => setPlaces(e.target.value)} type='text' placeholder='Place of origin 🗺️' className='inp' />
                {mainCategory=="Ancient Remedies" &&
                    <input value={wpmh} onChange={(e) => setWpmh(e.target.value)} type='text' placeholder='Harmful for patients 🤒' className='inp' />
                }
                {/* <input value={wpmh} onChange={(e) => setWpmh(e.target.value)} type='text' placeholder='Harmful for patients 🤒' className='inp' /> */}
                <input value={vitamin} onChange={(e) => setVitsmin(e.target.value)} type='text' placeholder='Vitamin info 💪🏻' className='inp' />

                {/* Ingredients */}
                <div className='flex w-full'>
                    <input value={ingredient} onChange={(e) => setIngredient(e.target.value)} type="text" placeholder='Ingredient 🧺' className='inp w-full' ref={ingredientFocus} />
                    <button onClick={addIngredient} type="button" className='bg-green text-white font-semibold px-2'><BsPlusCircleFill /></button>
                </div>
                <div className='flex gap-2 flex-wrap'>{ingredients.map((c, i) => (
                    <div key={i} className='flex gap-2 text-sm bg-slate-200 py-1 px-2'><p>{c}</p>
                        <button onClick={() => deleteIngredient(i)} className='bg-gray-600 text-white p-1'><BsXCircle /></button>
                    </div>
                ))}</div>

                {/* Steps */}
                <div className='flex w-full'>
                    <input value={step} onChange={(e) => setStep(e.target.value)} type="text" placeholder='Step 🔢' className='inp w-full' />
                    <button onClick={addStep} type="button" className='bg-green text-white font-semibold px-2'><BsPlusCircleFill /></button>
                </div>
                <div className='flex flex-wrap items-center gap-2'>{steps.map((c, i) => (
                    <div key={i} className='flex gap-2 text-sm bg-slate-200 py-1 px-2'><p>Step {i + 1}: {c}</p>
                        <button onClick={() => deleteStep(i)} className='bg-red-600 text-white h-7 w-7 flex items-center justify-center'><BsXCircle /></button>
                    </div>
                ))}</div>

                {/* Tags */}
                <div className='flex w-full'>
                    <Select
                        options={tagOptions}
                        className="border text-sm px-4 py-2 outline-none"
                        placeholder="Add tags..."
                        inp={cat}
                        setInp={setCat}
                        width={400}
                    />
                    <button onClick={addCategory} type="button" className='bg-green text-white font-semibold px-2'><BsPlusCircleFill /></button>
                </div>

                <div className='flex gap-2 flex-wrap mt-2'>
                    {cats.map((c, i) => (
                        <div key={i} className='flex gap-2 text-sm bg-slate-200 py-1 px-2'>
                            <p>{c}</p>
                            <button onClick={() => deleteCategory(i)} className='bg-gray-600 text-white p-1 rounded-full'><BsXCircle /></button>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <ReactQuill theme="snow" value={desc} onChange={setDesc} placeholder="Enter full description..." className="bg-white rounded-md" />

                <button onClick={uploadPost} className='p-2 bg-green text-white font-semibold mt-8'>Upload Post</button>
            </div>
        </div>
    );
};

export default Createpost;
