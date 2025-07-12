import React, { useEffect, useRef, useState } from 'react';
import PostCardForFilter from './PostCardForFilter.jsx';
import Select from '../components/Select.jsx';
import Magic from '../components/Magic.jsx';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';

const PostSection = ({ send }) => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [tag, setTag] = useState(send || 'All');
  const [magic, setMagic] = useState(false);
  const [input, setInput] = useState("");
  const [mainCategory, setMainCategory] = useState("");

  const scrollToTop = useRef();

  const tags = ['All', 'skin', 'cough', 'diabetes', 'hair', 'immunity'];
  const ingredient = ['All', 'Turmeric', 'Neem', 'Triphala', 'Ala', 'Honey'];

  const getPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/auth/api/post/hostData`);
      setPosts(res.data.data);
      setFilters(res.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPosts();
    scrollToTop.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const onClickTag = (ele) => {
    setTag(ele);
    filterByAll(mainCategory, ele, input);
  };

  const handleSearch = () => {
    filterByAll(mainCategory, tag, input);
    setMagic(true);
    setTimeout(() => setMagic(false), 1500);
  };

  const handleMainCategoryChange = (e) => {
    const selected = e.target.value;
    setMainCategory(selected);
    filterByAll(selected, tag, input);
  };

  const filterByAll = (category, tagValue, keyword) => {
    const filtered = posts.filter(item => {
      const matchesCategory = category ? item.category === category : true;
      const matchesTag =
        tagValue === "All" || !tagValue
          ? true
          : item.title.toLowerCase().includes(tagValue.toLowerCase()) ||
            item.desc.toLowerCase().includes(tagValue.toLowerCase()) ||
            item.ingredient.some(i => i.toLowerCase().includes(tagValue.toLowerCase())) ||
            item.categories.some(c => c.toLowerCase().includes(tagValue.toLowerCase()));
      const matchesSearch =
        keyword.trim() === "" ||
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.desc.toLowerCase().includes(keyword.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    });

    setFilters(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row" ref={scrollToTop}>
      {/* Sidebar */}
      <aside className="w-full md:w-72 md:min-h-screen bg-white border-r border-gray-200 p-4 space-y-6 sticky top-0 z-40">
        {/* Main Category Filter */}
        <div>
          <p className="font-medium text-sm mb-2">Filter by Main Category</p>
          <select
            value={mainCategory}
            onChange={handleMainCategoryChange}
            className="font-semibold text-sm w-full bg-green-900 text-white p-2 rounded-full"
          >
            <option value="">All Categories</option>
            <option value="Ancient Remedies">Ancient Remedies</option>
            <option value="Wild Vegetables">Wild Vegetables</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 border-b pb-4">
          <Select
            options={tags}
            className="border text-sm border-gray-300 px-3 py-2 w-full"
            placeholder="Search by tags..."
            inp={input}
            setInp={setInput}
            width={300}
          />
          <button onClick={handleSearch} className="bg-green text-white p-2 rounded hover:bg-green-600">
            <BsSearch />
          </button>
        </div>

        {/* Filter by Tags */}
        <div>
          <p className="font-medium text-sm mb-2">Filter By Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((item, i) => (
              <button
                key={i}
                onClick={() => onClickTag(item)}
                className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                  item === tag ? "bg-green text-white border-green" : "text-green border-green hover:bg-green/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Filter by Ingredients */}
        <div>
          <p className="font-medium text-sm mb-2">Filter By Ingredient</p>
          <div className="flex flex-wrap gap-2">
            {ingredient.map((item, i) => (
              <button
                key={i}
                onClick={() => onClickTag(item)}
                className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${
                  item === tag ? "bg-green text-white border-green" : "text-green border-green hover:bg-green/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Posts Grid */}
      <main className="flex-1 px-4 py-6">
        {magic && <Magic />}
        {filters.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filters.map((post) => (
              <PostCardForFilter key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PostSection;
