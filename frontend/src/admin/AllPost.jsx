import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../Utils/UserContext.jsx';
import AdminPostCard from './AdminPostCard.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Analysis from './Analysis.jsx';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [dailyPosts, setDailyPosts] = useState([]);
  const { user } = useContext(UserContext);

  const getDashboardData = async () => {
    try {
      const postsResp = await axios.get(`http://localhost:8000/auth/api/post`);
      // const statsResp = await axios.get(`http://localhost:8000/auth/api/dashboard-stats`);
      // const dailyPostsResp = await axios.get(`http://localhost:8000/auth/api/daily-posts`);

      setPosts(postsResp.data.data);
      setStats(statsResp.data);
      setDailyPosts(dailyPostsResp.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="p-4">
      {/* Top Statistics
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="All Posts" value={posts.length} />
        <StatCard title="Hosted Posts" value={stats.hostedPosts} />
        <StatCard title="All Users" value={stats.totalUsers} />
        <StatCard title="Uploaded PDFs" value={stats.totalPDFs} />
        <StatCard title="Validated Posts" value={stats.validatedPosts} />
        <StatCard title="Pending Validations" value={stats.pendingPosts} />
      </div>

      {/* Line Chart for Daily Blog Posts */}
      {/* <div className="w-full h-96 mb-8">
        <h2 className="text-xl font-semibold mb-2">Daily Blog Posts</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyPosts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>  */}
    

      {/* Admin Post Cards */}
      <Analysis/>
      <div className='w-full grid md:grid-cols-4 grid-cols-2'>
        {posts.map((post, index) => (
          <div key={index} >
            <AdminPostCard key={post._id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-4 text-center border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-blue-600">{value ?? 0}</p>
  </div>
);

export default Dashboard;
