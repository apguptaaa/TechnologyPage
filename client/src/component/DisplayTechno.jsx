import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayTechnology = () => {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/technodisplay");
        setTechnologies(res.data.data);
      } catch (err) {
        console.error("Error fetching technologies:", err);
      }
    };
    fetchTechnologies();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">📦 Technologies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologies.map((tech) => (
          <div key={tech._id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={tech.image}
              alt={tech.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{tech.title}</h3>
            <p className="text-sm text-gray-600">{tech.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTechnology;
