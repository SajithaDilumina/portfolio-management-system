import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoAddSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import '../Styles/search.css';

const MediaList = () => {
    const [medias, setMedias] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); 

    useEffect(() => {
        axios.get('http://localhost:5000/media/')
            .then(response => {
                setMedias(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleChange = e => {
        setSearchTitle(e.target.value);
    };

    const handleSearch = () => {
        axios.get(`http://localhost:5000/media/search?title=${searchTitle}`)
            .then(response => {
                setMedias(response.data);
            })
            .catch(error => {
                console.error('Error searching media:', error);
            });
    };

    const handleCategoryChange = e => {
        setSelectedCategory(e.target.value);
    };

    const filteredMedias = selectedCategory === 'All' ? medias : medias.filter(media => media.category === selectedCategory);

    const handleDelete = id => {
        const confirmDelete = window.confirm('Are you sure you want to delete this content?');
        
        if (confirmDelete) {
            axios.delete(`http://localhost:5000/media/delete/${id}`)
                .then(response => {
                    console.log(response.data);
                    setMedias(medias.filter(media => media.id !== id));
                    alert('Content successfully deleted.');
                })
                .catch(error => {
                    console.error('Error deleting media:', error);
                });
        } else {
            
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Media Content Dashboard</h1>
            </div>

            <div className='search-container'>
                <input
                    type="text"
                    placeholder="Search title here"
                    value={searchTitle}
                    onChange={handleChange}
                />
                <button className='search-button' onClick={handleSearch}>Search</button>
            </div>

            <div className='filter-container'>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="All">All Categories</option>
                    <option value="Photography">Photography</option>
                    <option value="YouTuber">YouTuber</option>
                    <option value="Blog">Blog</option>
                </select>
            </div>

            <Link to={`/add`}>
                <button className='add'><IoAddSharp/> Add content </button>
            </Link>

            <table className='table'>
                <thead className='table-light'>
                    <tr>
                        <th>Content</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMedias.map(media => (
                        <tr key={media.id}>
                            <td>{media.content}</td>
                            <td>{media.title}</td>
                            <td>{media.description}</td>
                            <td>{media.type}</td>
                            <td>{media.category}</td>
                            <td>{media.likes}</td>
                            <td>{media.dislikes}</td>
                            <td>
                                <button className='delete' onClick={() => handleDelete(media._id)}>Delete</button>
                            </td>
                            <td>
                                <Link to={`/update/${media._id}`}>
                                    <button className='update'>Update</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MediaList;
