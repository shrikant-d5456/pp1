import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BsClipboardData,
  BsFileEarmarkText,
  BsExclamationTriangle,
  BsCheckCircleFill,
} from 'react-icons/bs';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const Analysis = () => {
  const [posts, setPosts] = useState([]);
  const [hostPosts, setHostPosts] = useState([]);
  const [Validator1Posts,setValidator1Posts] = useState([]);
  const [Validator2Posts,setValidator2Posts] = useState([]);
  const [Validator3Posts,setValidator3Posts] = useState([]);
  const [Validator4Posts,setValidator4Posts] = useState([]);
  const [Validator5Posts,setValidator5Posts] = useState([]);
  const getDashboardData = async () => {
    try {
      const postsResp = await axios.get(`http://localhost:8000/auth/api/post`);
      setPosts(postsResp.data.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };
  const getHostPosts = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/hostData`);
      setHostPosts(resp.data.data);
    } catch (err) {
      setError(err.msg);
    }
  };
  const getposts1 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator1-checked-post`);
      setValidator1Posts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts2 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator2-checked-post`);
      setValidator2Posts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts3 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator3-checked-post`);
      setValidator3Posts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts4 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator4-checked-post`);
      setValidator4Posts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const getposts5 = async () => {
    try {
      const resp = await axios.get(`http://localhost:8000/auth/api/post/validator5-checked-post`);
      setValidator5Posts(resp.data.data);
    } catch (err) {
      setError(err.message);
    }
  };


  useEffect(() => {
    getDashboardData();
    getHostPosts();
    getposts1();
    getposts2();
    getposts3();
    getposts4();
    getposts5();
  }, []);

 const getPostsPerDay = (posts) => {
  const dayMap = {};

  posts.forEach((post) => {
    const date = new Date(post.createdAt).toISOString().split('T')[0]; // Format: YYYY-MM-DD
    dayMap[date] = (dayMap[date] || 0) + 1;
  });

  return Object.entries(dayMap)
    .sort(([a], [b]) => new Date(a) - new Date(b)) // Sort by date ascending
    .map(([date, count]) => ({
      date,
      count,
    }));
};
const postsPerDay = getPostsPerDay(posts);



  const stats = [
    {
      title: 'Total Posts',
      count: posts?.length || 0,
      icon: <BsClipboardData className="text-blue-600 text-4xl" />,
      color: 'bg-blue-100',
    },
    {
      title: 'Hosted Posts',
      count: hostPosts?.length || 0,
      icon: <BsFileEarmarkText className="text-green-600 text-4xl" />,
      color: 'bg-green-100',
    },
    {
      title: 'Remaining Hosted Posts',
      count: posts?.length - hostPosts?.length || 0,
      icon: <BsExclamationTriangle className="text-yellow-600 text-4xl" />,
      color: 'bg-yellow-100',
    },
    {
      title: 'Validator 1 Checked',
      count: Validator1Posts.length || 0,
      icon: <BsCheckCircleFill className="text-green-800 text-4xl" />,
      color: 'bg-green-50',
    },
    {
      title: 'Validator 2 Checked',
      count: Validator2Posts.length || 0,
      icon: <BsCheckCircleFill className="text-green-800 text-4xl" />,
      color: 'bg-green-50',
    },
    {
      title: 'Validator 3 Checked',
      count: Validator3Posts.length || 0,
      icon: <BsCheckCircleFill className="text-green-800 text-4xl" />,
      color: 'bg-green-50',
    },
    {
      title: 'Validator 4 Checked',
      count: Validator4Posts.length || 0,
      icon: <BsCheckCircleFill className="text-green-800 text-4xl" />,
      color: 'bg-green-50',
    },
    {
      title: 'Validator 5 Checked',
      count: Validator5Posts.length || 0,
      icon: <BsCheckCircleFill className="text-green-800 text-4xl" />,
      color: 'bg-green-50',
    },
  ];

  return (
    <div className="p-6 mt-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard Analysis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md p-5 flex items-center justify-between ${stat.color}`}
          >
            <div>
              <h3 className="text-lg font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Bar Chart */}
  <div className="bg-white rounded-xl shadow-md p-4">
    <h3 className="text-lg font-semibold mb-4">Posts Overview</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={[
        { name: 'Total', value: posts.length },
        { name: 'Hosted', value: hostPosts.length },
        { name: 'Remaining', value: posts.length - hostPosts.length }
      ]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Pie Chart */}
  <div className="bg-white rounded-xl shadow-md p-4">
    <h3 className="text-lg font-semibold mb-4">Validator Check Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={[
            { name: 'Validator 1', value: Validator1Posts.length },
            { name: 'Validator 2', value: Validator2Posts.length },
            { name: 'Validator 3', value: Validator3Posts.length },
            { name: 'Validator 4', value: Validator4Posts.length },
            { name: 'Validator 5', value: Validator5Posts.length },
          ]}
          cx="50%" cy="50%" outerRadius={90} label
          dataKey="value"
        >
          {['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'].map((color, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
{/* Daily Uploads Overview */}
<div className="bg-white rounded-xl shadow-md p-4 mt-8">
  <h3 className="text-lg font-semibold mb-4">Daily Post Upload Overview</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={postsPerDay}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#10b981" name="Posts Uploaded" />
    </BarChart>
  </ResponsiveContainer>
</div>


    </div>
  );
};

export default Analysis;
