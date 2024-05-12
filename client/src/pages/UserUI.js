import React, { Component } from 'react';
import '../Styles/useraddimage.css';
import axios from 'axios';


import cover from '../images/aa.png';
import NavBar from '../components/NavBar';
import Footer from './User_UI/U_Pages/footer';

class AddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            posts: [],
            filteredPosts: [],
            enlargedImage: null
        };
    }

    handleImageClick = (image) => {
        this.setState((prevState) => ({
            enlargedImage: prevState.enlargedImage ? null : image
        }));
    };

    handleCloseEnlarged = () => {
        this.setState({ enlargedImage: null });
    };

    fetchImages = async () => {
        try {
            const response = await fetch("http://localhost:5000/images");
            if (response.ok) {
                const data = await response.json();
                this.setState({ images: data.data });
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    componentDidMount() {
        this.fetchImages();
        this.retrievePosts();
    }
    
    retrievePosts = () => {
        axios.get('/posts')
          .then((res) => {
            if (res.data.success) {
              this.setState({
                posts: res.data.existingPosts,
                filteredPosts: res.data.existingPosts,
              });
            }
          })
          .catch((error) => {
            console.error('Error retrieving posts:', error);
          });
    };

    render() {
        
        const { images, enlargedImage, posts, filteredPosts } = this.state;

        return (
            <div id="about">
                <div className="hero-section" style={{ position: 'relative' }}>
                    <div className="cover-image" style={{ position: 'relative' }}>
                        <img src={cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover', justifyContent: 'center', alignItems: 'center'}} />
                        <div className="text-overlay" style={{ position: 'absolute', top: '-20px', left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center' }}>
                        {filteredPosts.map((post, index) => (
                            <div key={index}>
                                <div key={index}>
                                    <h1>Hi, I   {' '}
                                    <a href={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
                                        am {post.portfolio_name}
                                    </a></h1>
                                </div>
                            </div>
                        ))}
                        <div>
                            I am a
                            {filteredPosts.map((post, index) => (
                                <p key={index} style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
                                    {post.category}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                    <div className="profile-image">
                        {posts.map((post, index) => (
                            <img
                                key={index}
                                src={post?.image?.image}
                                alt="Portfolio"
                                style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='bioDescription'>
                <h5>Bio</h5>
                {filteredPosts.map((post, index) => (
                    <p key={index}>{post.bio}</p>
                ))}
                <h5>Description</h5>
                {filteredPosts.map((post, index) => (
                    <p key={index}>{post.description}</p>
                ))}
            </div>
            <div className="imageContainer">
                <div className="gallery">
                    {images.map((image, index) => (
                        <div
                            key={image._id}
                            className="imageItem"
                            onClick={() => this.handleImageClick(image)}
                            style={{ filter: enlargedImage ? (image._id === enlargedImage._id ? 'none' : 'blur(8px)') : 'none' }}
                        >
                            <img src={image.image} alt={image.title} className="uploadedImage" />
                            <div className="imageDetails">
                                <h4>{image.title}</h4>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {enlargedImage && (
                <div className="enlargedImageModal" onClick={this.handleCloseEnlarged} style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: '999' }}>
                    <img src={enlargedImage.image} alt={enlargedImage.title} className="enlargedImage" style={{ maxWidth: '80%', maxHeight: '80%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '8px' }} />
                </div>
            )}
            <NavBar />
            <Footer />
        </div>
    );
  }
}

export default AddImage;
