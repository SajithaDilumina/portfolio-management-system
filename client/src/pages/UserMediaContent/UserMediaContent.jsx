import React, { useState, useEffect } from 'react';
import Styles from './UserMediaContent.module.scss';
import MediaCard from '../../components/MediaCard/MediaCard';
import { MediaService } from '../../Services/Media.Service';
import { toast } from 'react-toastify';
import { Grid, TextField, MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const UserMediaContent = () => {
    const [medias, setMedias] = useState([]);
    const [typeFilter, setTypeFilter] = useState('All');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        initialData();
    }, []);

    const initialData = async () => {
        try {
            const res = await MediaService.getAllMedia();
            setMedias(res.data);
        } catch (error) {
            console.error('Error fetching media:', error);
            toast.error('Failed to fetch media');
        }
    };

    const handleTypeFilterChange = (event) => {
        setTypeFilter(event.target.value);
    };

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const filteredMedias = medias.filter(media => {
        return (typeFilter === 'All' || media.type === typeFilter) &&
               (categoryFilter === 'All' || media.category === categoryFilter) &&
               (media.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                media.description.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const handleLike = (id) => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const userId = user._id;
       const payload = {
              id:id ,
              userId:userId
       }
        MediaService.handleLike(payload).then((res) => {
                    initialData();
                    toast.success('Media liked successfully');
        }).catch((err) => {
                    console.error('Error liking media:', err);
                    toast.error('Failed to like media');
        });
            };

    const handleDislike = (id) => {
        console.log('Dislike', id);
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const userId = user._id;
         const payload = {
                  id:id ,
                  userId:userId
                }
        MediaService.handleDisLike(payload).then((res) => {
                    initialData();
                    toast.success('Media disliked successfully');
        }).catch((err) => {
                    console.error('Error disliking media:', err);
                    toast.error('Failed to dislike media');
        });
       
    };

    return (
        <div className={Styles.container}>
            <Grid container spacing={2} sx={{ justifyContent: "center", display: "flex" }}>
            <Grid item xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Search Media"
                        variant="filled"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>                       
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={typeFilter}
                            label="Type"
                            onChange={handleTypeFilterChange}
                        >
                            <MenuItem value="All">All Types</MenuItem>
                            <MenuItem value="Image">Image</MenuItem>
                            <MenuItem value="Video">Video</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={categoryFilter}
                            label="Category"
                            onChange={handleCategoryFilterChange}
                        >
                            <MenuItem value="All">All Categories</MenuItem>
                            <MenuItem value="Photography">Photography</MenuItem>
                            <MenuItem value="YouTube">YouTube</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
               
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent="center">
                        {filteredMedias.map(media => (
                            <Grid item key={media._id} xs={12} sm={6} md={4} lg={3}>
                                <MediaCard media={media}  handleDislike={handleDislike} handleLike={handleLike}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserMediaContent;
