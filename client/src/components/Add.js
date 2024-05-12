import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Update.css';
import { Link, useNavigate } from 'react-router-dom';

const AddMediaForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        category: '',
        content: null 
    });
    const [typeError, setTypeError] = useState('');
    const [categoryError, setCategoryError] = useState('');

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'type') {
            if (value !== 'Image' && value !== 'Video' && value !== 'Document') {
                setTypeError('Type must be "Image", "Video", or "Document" only');
            } else {
                setTypeError('');
            }
        }

        if (name === 'category') {
            if (value !== 'YouTuber' && value !== 'Blog' && value !== 'Photography') {
                setCategoryError('Category must be "YouTuber", "Blog", or "Photography" only');
            } else {
                setCategoryError('');
            }
        }
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'video/mp4', 'application/pdf'];
        if (file && allowedTypes.includes(file.type)) {
            const maxSize = 4 * 1024 * 1024; 
            if (file.size > maxSize) {
                alert('File size exceeds the maximum limit of 4MB.');
                e.target.value = null;
            } else {
                setFormData({ ...formData, content: file });
            }
        } else {
            alert('Only .png, .jpeg, .jpg, .mp4, and .pdf files are allowed.');
            e.target.value = null; 
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        if (typeError || categoryError) {
            alert('Please correct the errors before submitting.');
            return;
        }

        const formDataWithFile = new FormData(); 
        formDataWithFile.append('title', formData.title);
        formDataWithFile.append('description', formData.description);
        formDataWithFile.append('type', formData.type);
        formDataWithFile.append('category', formData.category);
        formDataWithFile.append('content', formData.content); 

        axios.post('http://localhost:5000/media/add', formDataWithFile, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        })
        .then(response => {
            console.log(response.data);
            alert('Media added successfully.'); 
            setFormData({
                title: '',
                description: '',
                type: '',
                category: '',
                content: null 
            });
            navigate('/');
        })
        .catch(error => {
            console.error('Error adding media:', error);
            alert('Failed to add media. Please try again.'); 
        });
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            description: '',
            type: '',
            category: '',
            content: null 
        });
    };

    return (
        <div className='containor'>
            <h2>Add New Media</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder='Enter title here'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        placeholder='Image or Video or Document'
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                    {typeError && <p className="error">{typeError}</p>}
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        placeholder='YouTuber, Blog, or Photography only'
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    {categoryError && <p className="error">{categoryError}</p>}
                </div>
                <div>
                    <label>File:</label>
                    <input
                        type="file"
                        name="content"
                        onChange={handleFileChange} 
                        required
                    />
                </div>
                <button type="submit">Submit</button>
                <br></br>
                <Link to="/">
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </Link>
            </form>
        </div>
    );
};

export default AddMediaForm;
