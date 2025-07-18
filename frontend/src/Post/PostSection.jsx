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
  const [aiResponse, setAiResponse] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

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
    setInput("");
    filterByAll(mainCategory, ele, input);
  };

  const handleSearch = async () => {
    const filtered = posts.filter(item => {
      const matchesCategory = mainCategory ? item.category === mainCategory : true;
      const matchesTag =
        tag === "All" || !tag
          ? true
          : item.title.toLowerCase().includes(tag.toLowerCase()) ||
          item.desc.toLowerCase().includes(tag.toLowerCase()) ||
          item.ingredient.some(i => i.toLowerCase().includes(tag.toLowerCase())) ||
          item.categories.some(c => c.toLowerCase().includes(tag.toLowerCase()));
      const matchesSearch =
        input.trim() === "" ||
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.desc.toLowerCase().includes(input.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    });

    setFilters(filtered);
    setMagic(true);
    setAiResponse("");
    setLoadingAI(false);

    setTimeout(async () => {
      setMagic(false);

      if (filtered.length === 0 && input.trim() !== "") {
        setLoadingAI(true);
        const aiSuggestion = await fetchOpenRouterResponse(input);
        setAiResponse(aiSuggestion);
        setLoadingAI(false);
      } else {
        setAiResponse("");
      }
    }, 1000);
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
  setAiResponse(""); // Clear suggestion when applying any new filter
};


  const fetchOpenRouterResponse = async (query) => {
    try {
      const response = await axios({
        url: "https://openrouter.ai/api/v1/chat/completions",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        data: {
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an Ayurvedic expert. Only suggest plant-based and natural remedies."
            },
            {
              role: "user",
              content: `Provide information for Ayurvedic treatments or herbal remedies for: ${query}?`
            }
          ]
        }
      });

      return response.data?.choices?.[0]?.message?.content || "No AI suggestion found.";
    } catch (error) {
      console.error("❌ OpenRouter API Error:", error.response?.data || error.message);
      return "❌ AI Suggestion Error. Please try again later.";
    }
  };




  return (
    <div className="flex flex-col md:flex-row" ref={scrollToTop}>
      {/* Sidebar */}
      <aside className="w-full md:w-72 md:min-h-screen bg-white border-r border-gray-200 p-4 space-y-6 sticky top-0 z-40">
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
                className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${item === tag ? "bg-green text-white border-green" : "text-green border-green hover:bg-green/10"}`}
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
                className={`px-3 py-1 rounded-full text-sm border transition-all duration-200 ${item === tag ? "bg-green text-white border-green" : "text-green border-green hover:bg-green/10"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

<main className="flex-1 px-4 py-6">
  {magic && <Magic />}

  {/* If no posts match the search */}
  {filters.length === 0 ? (
    <div className="text-center text-sm text-gray-600 my-4">
      <p>No exact posts found.</p>
    </div>
  ) : (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filters.map((post) => (
          <PostCardForFilter key={post._id} post={post} />
        ))}
      </div>
    </div>
  )}

  {/* ✅ Always show AI suggestion section */}
  <div className="mt-6">
    {loadingAI && (
      <p className="text-green-600 text-sm text-center">⏳ Searching Ayurvedic suggestions...</p>
    )}

    {aiResponse && (
      <div className="bg-green-50 border border-green-200 p-4 rounded mt-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Ayurvedic Image (you can dynamically change this based on aiResponse or keyword if needed) */}
        {/* AI Text Response */}
        <div className="text-left whitespace-pre-line">
          <p className="text-green-600 font-semibold">🌿 Ayurvedic Suggestion:</p>
          <p className="mt-2 text-gray-700">{aiResponse}</p>
        </div>
      </div>
    )}
  </div>
</main>

    </div>
  );
};

export default PostSection;
