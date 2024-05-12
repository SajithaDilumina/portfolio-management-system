import React, { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import Styles from './MyPosts.module.scss';
import { PostService } from '../../Services/Post.Service';
import { toast } from 'react-toastify';
import { Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        GetInitialData();
    }, []);

    useEffect(() => {
        filterPosts();
    }, [posts, searchTerm]);

    const GetInitialData = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const userId = user._id;
        console.log(userId)
        PostService.getPostsDetailsByUserID(userId).then((response) => {
            console.log(response.data)
            setPosts(response.data.posts);
            setFilteredPosts(response.data.posts);
        }).catch((error) => {
            toast.error('Error in fetching posts');
        });
    };

    const filterPosts = () => {
        if (!searchTerm) {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => 
                post.portfolio_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNavigate = (id, userId) => {
        navigate(`/post/${id}/${userId}`);
    }
    return (
        <div className={Styles.container}>
            <h1 className="text-2xl font-bold mb-4">My Posts</h1>
            <TextField
                fullWidth
                label="Search Posts"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginBlock: 3 }}
            />
            <Grid container spacing={2}>
                {filteredPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                        <PostCard post={post} handleNavigate={handleNavigate} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default MyPosts;
