// Gallery.js
import React, { useEffect, useState } from 'react';
import { GalleryData } from './GalleryData';
import '../../User_UI/Styles/gallery.css'
import { Gallery } from './GalleryData'; // Import Gallery array
import { PostService } from '../../../Services/Post.Service';
import { toast } from 'react-toastify';
import { Grid, TextField } from '@mui/material';
import PostCard from '../../../components/PostCard/PostCard';
import { useNavigate } from 'react-router-dom';
const GalleryComponent = () => {
  // const [data, setData] = useState([]);
  // const [collection,setcollection] = useState([]);

  // useEffect(() => {
  //   setData(GalleryData);
  //   setcollection([... new Set(GalleryData.map((item)=> item.title))])

  // }, [])

  // const gallery_filter =(itemData) =>{
  //     const filterData = GalleryData.filter((item)=> item.title == itemData );
  //     setData(filterData);
  // }

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
  PostService.getPostsDetails().then((response) => {
    console.log("data",response.data.existingPosts)
    setPosts(response.data.existingPosts);
  }).catch((error) => {
    toast.error('Error in fetching posts');
  });
  }

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
  const post=posts.filter((post)=>post._id===id);
  console.log("[post]",post)
  navigate(`/post/${id}/${post[0].userID}`);
}
  return (
    <div>
      <div className="gallerywrapper">
        {/* <div className="filterItem">
          <ul>
            <li><button onClick={()=> setData(GalleryData)}>All</button></li>
            {
              collection.map((item)=> <li><button onClick={()=>{gallery_filter(item)}}>{item}</button></li>)
            }
          </ul>

        </div>
        <div className="galleryContaoner">
          {
            data.map((item) => <div key={item.id}  className="galleryItem"><img src={item.image} /> </div>)
          }
        </div> */}

            
            <Grid container spacing={2} sx={{padding:"6rem"}}>
            <Grid item xs={12} sm={12} sx={{marginRight:"6rem"}}>
            <TextField
                fullWidth
                label="Search Posts"
                variant="filled"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ marginInline: 3,color:"black",backgroundColor:"white" }}
                InputLabelProps={{
                  style: { color: '#418ca3' }, // Sets the label text color to black
              }}
            />
            </Grid>
                {filteredPosts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                        <PostCard post={post} handleNavigate={handleNavigate} />
                    </Grid>
                ))}
            </Grid>

      </div>
    </div>
  );
}

export default GalleryComponent;
