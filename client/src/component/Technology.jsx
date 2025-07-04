 import React, { useState } from "react";
 import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import this
const TechModalForm = () => {
    const navigate = useNavigate(); // ✅ Initialize it
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [cardList, setCardList] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const imageURL = URL.createObjectURL(formData.image); // preview image locally
  //   const newCard = {
  //     title: formData.title,
  //     description: formData.description,
  //     image: imageURL,
  //   };

  //   setCardList([...cardList, newCard]);

  //   // Reset form and close modal
  //   setFormData({ title: "", description: "", image: null });
  //   setShowModal(false);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/technoinsert", data
       
      );

      //   // ✅ After successful insert, redirect:
      navigate("/displaytech"); // your technology display route Assuming your backend returns the created tech object
      const newCard = response.data;

      setCardList([...cardList, newCard]);

      // Reset form and close modal
      setFormData({ title: "", description: "", image: null });
      setShowModal(false);
    } catch (err) {
      console.error("Error uploading technology:", err);
      alert("Something went wrong!");
    }
  };

  return (
    // <div className="p-5">
    //   {/* Button to open modal */}
    //   <button
    //     onClick={() => setShowModal(true)}
    //     className="bg-blue-600 text-white px-4 py-2 rounded"
    //   >
    //     Open Form
    //   </button>

    //   {/* Modal */}
    //   {showModal && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    //       <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
    //         <h2 className="text-xl font-bold mb-4">Technologies</h2>

    //         <form onSubmit={handleSubmit} className="space-y-4">
    //           <div>
    //             <label className="block text-sm font-medium">Title</label>
    //             <input
    //               type="text"
    //               name="title"
    //               value={formData.title}
    //               onChange={handleChange}
    //               className="w-full border rounded px-3 py-2"
    //               required
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium">Description</label>
    //             <textarea
    //               name="description"
    //               value={formData.description}
    //               onChange={handleChange}
    //               className="w-full border rounded px-3 py-2"
    //               required
    //             />
    //           </div>

    //           <div>
    //             <label className="block text-sm font-medium">Image</label>
    //             <input
    //               type="file"
    //               name="image"
    //               accept="image/*"
    //               onChange={handleChange}
    //               className="w-full"
    //               required
    //             />
    //           </div>

    //           <div className="flex justify-end space-x-2">
    //             <button
    //               type="button"
    //               onClick={() => setShowModal(false)}
    //               className="bg-gray-300 px-4 py-2 rounded"
    //             >
    //               Cancel
    //             </button>
    //             <button
    //               type="submit"
    //               className="bg-green-600 text-white px-4 py-2 rounded"
    //             >
    //               Submit
    //             </button>
    //           </div>
    //         </form>

    //         {/* Close button */}
    //         <button
    //           onClick={() => setShowModal(false)}
    //           className="absolute top-2 right-2 text-gray-600 hover:text-black"
    //         >
    //           ✕
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {/* Cards Below the Button */}
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
    //     {cardList.map((card, index) => (
    //       <div
    //         key={index}
    //         className="bg-white shadow-md rounded overflow-hidden"
    //       >
    //         <img
    //           src={card.image}
    //           alt={card.title}
    //           className="w-full h-40 object-cover"
    //         />
    //         <div className="p-4">
    //           <h2 className="text-lg font-semibold">{card.title}</h2>
    //           <p className="text-sm text-gray-600">{card.description}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-1">Technologies</h2>
            <p className="text-2xl text-blue-600 font-semibold">We work on..</p>
          </div>

          {/* Button to open modal */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
          >
             Add Technology
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
              <h2 className="text-xl font-bold mb-4">Add Technology</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Cards Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {techs.length > 0 ? (
            techs.map((tech, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={tech.image}
                  alt={tech.title}
                  className="w-full h-40 object-contain bg-white p-4"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{tech.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tech.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 italic">
              No technologies found.
            </p>
          )}
        </div> */}

         {/* Cards Below the Button */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
       {cardList.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded overflow-hidden"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default TechModalForm;