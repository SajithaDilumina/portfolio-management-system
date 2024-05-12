import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import '../Styles/Update.css';

const UpdateMediaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        category: '',
        content: null // Initialize content as null
    });
    const [typeError, setTypeError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/media/get/${id}`)
            .then(response => {
                const mediaData = response.data.media;
                setFormData({
                    title: mediaData.title,
                    description: mediaData.description,
                    type: mediaData.type,
                    category: mediaData.category
                });
            })
            .catch(error => {
                console.error('Error fetching media:', error);
            });
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        
        // Validation for type field
        if (name === 'type') {
            if (value !== 'Image' && value !== 'Video' && value != 'Document') {
                setTypeError('Type must be "Image" , "Video" or "Document');
            } else {
                setTypeError('');
            }
        }
    };

    // Handle file input change
    const handleFileChange = e => {
        setFormData({ ...formData, content: e.target.files[0] });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Check if there's any validation error
        if (typeError) {
            alert('Please correct the errors before submitting.');
            return;
        }

        const confirmUpdate = window.confirm('Are you sure you want to update this media?');

        if (confirmUpdate) {
            const formDataWithFile = new FormData(); // Create FormData object
            formDataWithFile.append('title', formData.title);
            formDataWithFile.append('description', formData.description);
            formDataWithFile.append('type', formData.type);
            formDataWithFile.append('category', formData.category);
            formDataWithFile.append('content', formData.content); // Append file to FormData

            axios.put(`http://localhost:5000/media/update/${id}`, formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
                }
            })
            .then(response => {
                console.log(response.data);
                alert('Media updated successfully.');
                navigate('/');
            })
            .catch(error => {
                console.error('Error updating media:', error);
                alert('Error updating media. Please try again.');
            });
        }
    };

    const handleCancel = () => {
        // Redirect to a different route or perform other actions
    };

    return (
        <div className='containor'>
            <h2 className='h2'>Update Media</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} placeholder='Enter new title' onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" onChange={handleChange} required value={formData.description} placeholder='Enter a description' />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" name="type" placeholder='Image or Video or Document' value={formData.type} onChange={handleChange} required />
                    {typeError && <p className="error">{typeError}</p>}
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={formData.category} placeholder='Enter category' onChange={handleChange} required/>
                </div>
                <div>
                    <label>File:</label>
                    <input type="file" name="content" onChange={handleFileChange} />
                </div>
                <button type="submit">Update</button>
                <br></br>
                <Link to="/">
                    <button className='cancel' onClick={handleCancel}>Cancel</button>
                </Link>
            </form>
        </div>
    );
};

export default UpdateMediaForm;
