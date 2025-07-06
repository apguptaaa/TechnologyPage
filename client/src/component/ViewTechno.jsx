// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ViewTechnology = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [tech, setTech] = useState(null);

//   useEffect(() => {
//     const fetchTech = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/technoview/${id}`);
//         console.log("Fetched tech:", res.data);
//         const data = res.data.data || res.data;
//         setTech(data);
//       } catch (err) {
//         console.error("Error fetching technology:", err.message, err.response?.data);
//         alert("Failed to load technology");
//         navigate("/");
//       }
//     };
//     fetchTech();
//   }, [id, navigate]);

//   if (!tech) {
//     return <div className="text-center text-gray-600 py-10">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
//       <div className="max-w-xl w-full bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-3xl font-bold text-indigo-700 mb-4 text-center">🔍 View Technology</h2>
//         <p className="text-gray-700 text-lg mb-4"><strong>Title:</strong> {tech.title}</p>
//         <p className="text-gray-700 text-base mb-6"><strong>Description:</strong> {tech.description}</p>
//         {tech.image && (
//           <div className="mb-4">
//             <p className="text-sm text-gray-500 mb-2">Image Preview</p>
//             <img
//               src={tech.image}
//               alt={tech.title}
//               className="w-full h-64 object-cover rounded-lg border shadow"
//             />
//           </div>
//         )}
//         <div className="text-center">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-lg transition-all"
//           >
//             ⬅️ Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewTechnology;
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
        const res = await axios.get(`https://technoserverapi.onrender.com/api/technoview/${id}`);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
        <p className="text-gray-500 text-lg">Loading technology details...</p>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 flex items-center justify-center">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

      {/* Image Section */}
      {tech.image ? (
        <img
          src={tech.image}
          alt={tech.title}
          className="w-full h-56 md:h-full object-cover"
        />
      ) : (
        <div className="h-56 md:h-full flex items-center justify-center text-gray-400 bg-gray-100 italic">
          No image available
        </div>
      )}

      {/* Details Section */}
      <div className="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
            Technology Details
          </h1>
          <p className="text-gray-800 text-base mb-2">
            <span className="font-semibold text-gray-600">Title:</span> {tech.title}
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            <span className="font-semibold text-gray-600">Description:</span> {tech.description}
          </p>
        </div>

        <div className="mt-6 text-end">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-all shadow-md text-sm md:text-base"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default ViewTechnology;
