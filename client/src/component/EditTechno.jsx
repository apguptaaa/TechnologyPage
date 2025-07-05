import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateTechnology } from './LocalApi';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: null,
        oldImage: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`http://localhost:5000/api/technosingle/${id}`);
            setFormData({
                name: res.data.title,
                price: res.data.description,
                image: null,
                oldImage: res.data.image,
            });
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await updateTechnology(id, data);
            alert('✅ Product updated successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error updating product', err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-indigo-100 py-12 px-4 lg:px-16">
            <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
                    ✏️ Edit Product
                </h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="₹0.00"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Upload New Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full bg-white px-4 py-2 rounded-lg border border-gray-300 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                        />
                    </div>

                    {formData.oldImage && (
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">Current Image</p>
                            <img
                                src={formData.oldImage}
                                alt="Old"
                                className="w-24 h-24 mx-auto object-cover rounded-lg shadow-md border"
                            />
                        </div>
                    )}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-8 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            🔄 Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;