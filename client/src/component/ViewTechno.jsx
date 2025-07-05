import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewTechnology = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tech, setTech] = useState(null);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/technosingle/${id}`);
        console.log("Fetched tech:", res.data);
        const data = res.data.data || res.data;
        setTech(data);
      } catch (err) {
        console.error("Error fetching technology:", err.message, err.response?.data);
        alert("Failed to load technology");
        navigate("/");
      }
    };
    fetchTech();
  }, [id, navigate]);

  if (!tech) {
    return <div className="text-center text-gray-600 py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">🔍 View Technology</h2>
        <p className="text-gray-700 text-lg mb-4"><strong>Title:</strong> {tech.title}</p>
        <p className="text-gray-700 text-base mb-6"><strong>Description:</strong> {tech.description}</p>
        {tech.image && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Image Preview</p>
            <img
              src={tech.image}
              alt={tech.title}
              className="w-full h-64 object-cover rounded-lg border shadow"
            />
          </div>
        )}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-lg transition-all"
          >
            ⬅️ Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTechnology;
