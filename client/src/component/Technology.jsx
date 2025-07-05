// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TechModalForm = () => {
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   const [cardList, setCardList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false); // 🔄 For loader

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("image", formData.image);

//     try {
//       await axios.post("http://localhost:5000/api/technoinsert", data);
//       await fetchTechnologies(); // ✅ Refetch updated data
//       setFormData({ title: "", description: "", image: null });
//       setShowModal(false);
//     } catch (err) {
//       console.error("Error uploading technology:", err);
//       alert("Something went wrong!");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchTechnologies = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/technodisplay");
//       setCardList(res.data.data);
//     } catch (err) {
//       console.error("Error fetching technologies:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTechnologies();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-1">Technologies</h2>
//             <p className="text-2xl text-blue-600 font-semibold">We work on..</p>
//           </div>

//           <button
//             onClick={() => setShowModal(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
//           >
//             Add Technology
//           </button>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
//               <h2 className="text-xl font-bold mb-4">Add Technology</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     className="w-full border rounded px-3 py-2"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">Image</label>
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleChange}
//                     className="w-full"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="bg-gray-300 px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? (
//                       <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full inline-block"></span>
//                     ) : (
//                       "Submit"
//                     )}
//                   </button>
//                 </div>
//               </form>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-2 right-2 text-gray-600 hover:text-black"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Cards Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
//           {cardList.length > 0 ? (
//             cardList.map((card, index) => (
//               <div key={index} className="bg-white shadow-md rounded overflow-hidden">
//                 <img
//                   src={card.image}
//                   alt={card.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold">{card.title}</h2>
//                   <p className="text-sm text-gray-600">{card.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 italic col-span-full">
//               No technologies found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TechModalForm;
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";

// const TechModalForm = () => {
//   const [cardList, setCardList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const modalRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleBackdropClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       closeModal();
//     }
//   };

//   const closeModal = () => {
//     setIsAnimating(false);
//     setTimeout(() => setShowModal(false), 300); // Delay for animation
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("image", formData.image);

//     try {
//       await axios.post("http://localhost:5000/api/technoinsert", data);
//       await fetchTechnologies();
//       setFormData({ title: "", description: "", image: null });
//       closeModal();
//     } catch (error) {
//       alert("Upload failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const fetchTechnologies = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/technodisplay");
//       setCardList(res.data.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTechnologies();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-1">Technologies</h2>
//             <p className="text-2xl text-blue-600 font-semibold">We work on..</p>
//           </div>

//           <button
//             onClick={() => {
//               setShowModal(true);
//               setTimeout(() => setIsAnimating(true), 50); // trigger animation
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
//           >
//             Add Technology
//           </button>
//         </div> */}
//         <div className="flex justify-between items-center w-full max-w-full mx-auto bg-white rounded-xl shadow-lg p-6 space-y-2">
//           <div className="">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">
//               Technology
//             </h1>
//             <p className="text-gray-600 text-md">
//               Like Html, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and more.
//             </p>
//           </div>
//           <div className="">
//             <button
//                onClick={() => {
//               setShowModal(true);
//               setTimeout(() => setIsAnimating(true), 50); // trigger animation
//             }}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
//               </svg>
//               Add Technology
//             </button>
//           </div>
//         </div>
//         {/* Modal */}
//         {showModal && (
//           <div
//             className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"
//               }`}
//             onClick={handleBackdropClick}
//           >
//             <div
//               ref={modalRef}
//               className={`bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
//                 }`}
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200"
//                 >
//                   ×
//                 </button>
//                 <h2 className="text-2xl font-bold mb-1">Add Technology</h2>
//                 <p className="text-blue-100 text-sm">Fill in the details below</p>
//               </div>

//               <div className="p-6">
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                   {/* Title */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
//                       placeholder="Enter technology title"
//                       required
//                       disabled={isSubmitting}
//                     />
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="3"
//                       className="w-full border-2 border-gray-200 rounded-lg px-4 py-3"
//                       placeholder="Describe the technology"
//                       required
//                       disabled={isSubmitting}
//                     />
//                   </div>

//                   {/* Image Upload */}
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Image <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="file"
//                       name="image"
//                       accept="image/*"
//                       onChange={handleChange}
//                       className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6"
//                       required
//                       disabled={isSubmitting}
//                     />
//                     {formData.image && (
//                       <p className="text-sm text-green-600 mt-2">
//                         {formData.image.name}
//                       </p>
//                     )}
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex justify-end space-x-3 pt-4">
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg"
//                       disabled={isSubmitting}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <svg
//                             className="animate-spin mr-2 h-4 w-4"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             />
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
//                             />
//                           </svg>
//                           Submitting...
//                         </>
//                       ) : (
//                         "Submit"
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
//           {cardList.length > 0 ? (
//             cardList.map((card, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 ease-in-out overflow-hidden cursor-pointer"
//               >
//                 <img
//                   src={card.image}
//                   alt={card.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4 text-center">
//                   <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
//                   <p className="text-sm text-gray-600 mt-1">{card.description}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 italic col-span-full">No technologies found.</p>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default TechModalForm;



import React, { useEffect, useRef, useState } from "react";
import EditTechno from "./EditTechno";
import ViewTechno from "./ViewTechno";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TechModalForm = () => {
  const [cardList, setCardList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => setShowModal(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/technoinsert", data);
      await fetchTechnologies();
      setFormData({ title: "", description: "", image: null });
      closeModal();
    } catch (error) {
      alert("Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchTechnologies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/technodisplay");
      setCardList(res.data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this technology?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/technodelete/${id}`);
      await fetchTechnologies();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleDropdownToggle = (index) => {
    setDropdownOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    fetchTechnologies();

    const handleClickOutside = (event) => {
      if (!event.target.closest(".card-dropdown")) {
        setDropdownOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full max-w-full mx-auto bg-white rounded-xl max-sm:text-center shadow-lg p-6 gap-4">
          <div>
            <h1 className="text-3xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Technology</h1>
            <p className="text-gray-600 text-sm sm:text-sm">
              here are some technologies we work with, including HTML, CSS, JavaScript, React, Node.js, Express.js, MongoDB, and more.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setShowModal(true);
                setTimeout(() => setIsAnimating(true), 50);
              }}
              className="w-auto sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6  sm:px-4 py-4 sm:py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200  max-sm:items-center flex max-sm:justify-center text-sm max-sm:mx-auto"
            >
              Add Technology
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}
            onClick={handleBackdropClick}
          >
            <div
              ref={modalRef}
              className={`bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold mb-1">Add Technology</h2>
                <p className="text-blue-100 text-sm">Fill in the details below</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-lg px-4 py-3" required disabled={isSubmitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border-2 border-gray-200 rounded-lg px-4 py-3" required disabled={isSubmitting} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
                    <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full border-2 border-dashed border-gray-300 rounded-lg px-4 py-6" required disabled={isSubmitting} />
                    {formData.image && <p className="text-sm text-green-600 mt-2">{formData.image.name}</p>}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                    <button type="button" onClick={closeModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg" disabled={isSubmitting}>Cancel</button>
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 p-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-9 mt-8">
          {cardList.length > 0 ? (
            cardList.map((card, index) => (
              <div key={index} className="relative group   bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 ease-in-out overflow-hidden">
                <div className="relative overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                      onClick={() => {
                        navigate(`/view/${card._id}`);
                      }}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 hover:text-blue-600 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                      title="View Details"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${card._id}`)}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 hover:text-green-600 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                      title="Edit Technology"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(card._id)}
                      className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 hover:text-red-600 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                      title="Delete Technology"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No technologies found</p>
              <p className="text-gray-400 text-sm mt-1">Add your first technology to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechModalForm;


