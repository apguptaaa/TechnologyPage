import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateTechnology } from './LocalApi';

const EditTechno = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        oldImage: '',
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false); // for loader spinner

    useEffect(() => {
        const fetchTechno = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/technoview/${id}`);
                setFormData({
                    title: res.data.data.title,
                    description: res.data.data.description,
                    image: null,
                    oldImage: res.data.data.image,
                });
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchTechno();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.image) {
            setShowConfirmModal(true);
        } else {
            submitForm();
        }
    };

    const submitForm = async () => {
        setLoading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await updateTechnology(id, data);
            navigate('/');
        } catch (err) {
            console.error('Error updating technology', err);
            alert('❌ Failed to update technology');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left Section: Form */}
                <div className="p-10">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
                         Edit Technology
                    </h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter technology title"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter description"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-700 font-medium">Upload New Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-600 file:text-white
                                    hover:file:bg-indigo-700 transition duration-300"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl transition-transform transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading && (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                )}
                                🔄 {loading ? 'Updating...' : 'Update Technology'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section: Current Image */}
                <div className="bg-indigo-50 p-20 flex flex-col items-center justify-center border-l border-gray-200">
                    {formData.oldImage ? (
                        <>
                            <p className="text-sm text-gray-500 mb-3">Current Image</p>
                            <img
                                src={formData.oldImage}
                                alt="Old Technology"
                                className="w-auto h-auto object-cover rounded-xl shadow-lg border border-gray-300"
                            />
                        </>
                    ) : (
                        <p className="text-gray-400 text-center">No image uploaded yet</p>
                    )}
                </div>
            </div>

            {/*  Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50 transition-opacity duration-300 ">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Image Update</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to update the image?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    submitForm();
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTechno;
