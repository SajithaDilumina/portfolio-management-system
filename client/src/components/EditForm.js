import React, { useState, useEffect } from "react";
import images from '../images/aa.png';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddImagesModal from '../components/AddImagesModal';

export default function EditForm() {
  const [post, setPost] = useState(null);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [portfolioName, setPortfolioName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState('');
  const [gallery, setGallery] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        const { post } = res.data;
        setPost(post);
        setDescription(post.description);
        setCategory(post.category);
        setPortfolioName(post.portfolio_name);
        setBio(post.bio);
        setEmail(post.email);
        setContactNo(post.contact_no);
        setImageId(post.image);
        setGallery(post.gallery);
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'portfolio_name':
        setPortfolioName(value);
        break;
      case 'bio':
        setBio(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'contact_no':
        setContactNo(value);
        break;
      default:
        break;
    }
  };

  const handleGallerySubmit = (img, title, description) => {
    const newGallery = [
      ...gallery,
      {
        image: img,
        title: title,
        description: description,
      },
    ];
    setGallery(newGallery);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!description || !category || !portfolioName || !bio || !email || !contactNo || !imageId) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const data = {
      description,
      category,
      portfolio_name: portfolioName,
      bio,
      email,
      contact_no: contactNo,
      image: imageId,
      gallery: gallery // Include gallery in the data to be sent
    };

    axios.put(`/post/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          setDescription('');
          setCategory('');
          setPortfolioName('');
          setBio('');
          setEmail('');
          setContactNo('');
          setImage(null);
          setImageId('');
          setGallery([]); // Clear the gallery after submission
          alert('Data saved successfully!');
        }
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
        alert('Error saving data. Please try again.');
      });
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setShowError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setShowError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    if (!image) {
      setShowError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/images/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: image,
        }),
      });

      const res = await response.json();
      console.log(res);

      if (response.ok && res.success) {
        setShowAlert(true);
        setImage(null);
        setImageId(res.data._id);
      } else {
        console.error('Failed to upload image:', res.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  return (
    <section>
      <div className='formuser'>
        <div className='image-container'>
          <img src={images} alt='Placeholder' />
        </div>
        <div className='form-container'>
          <h2>
            <span style={{ color: 'white',fontWeight: 'bold' }}>Create</span>
            <span style={{ color: 'black',fontWeight: 'bold' }}> New Post</span>
          </h2>
          <form className='form' onSubmit={onSubmit}>
            {/* Form fields */}
            <div className={`row ${!category ? 'error' : ''}`}>
              <div className={`col-6`}>
                <label>Category:</label>
                <select name='category' value={category} onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Web Design">Web Design</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Photography">Photography</option>
                  <option value="Fine Art">Fine Art</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Typography">Typography</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
            </div>
            <div className={`row ${portfolioName ? '' : 'error'}`}>
              <div className='col-12'>
                <label>Portfolio Name:</label>
                <input
                  type='text'
                  name='portfolio_name'
                  value={portfolioName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={`row ${bio && bio.split(' ').filter(Boolean).length <= 20 ? '' : 'error'}`}>
              <div className='col-12'>
                <label>Bio:</label>
                <textarea
                  name='bio'
                  value={bio}
                  onChange={handleInputChange}
                ></textarea>
                <p>{bio.split(' ').filter(Boolean).length > 20 ? 'Bio should have less than 20 words' : ''}</p>
              </div>
            </div>
            <div className={`row ${description && description.split(' ').filter(Boolean).length >= 20 ? '' : 'error'}`}>
              <div className='col-12'>
                <label>Description:</label>
                <textarea
                  name='description'
                  value={description}
                  onChange={handleInputChange}
                ></textarea>
                <p className={`error-message ${description && description.split(' ').filter(Boolean).length < 20 ? 'error' : ''}`}>
                  {description.split(' ').filter(Boolean).length < 20 ? 'Description should have at least 20 words' : ''}
                </p>
              </div>
            </div>
            <div className={`row ${email ? '' : 'error'}`}>
              <div className='col-6'>
                <label>Email:</label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`col-6 ${((!/^\+?[0-9]{10}$/.test(contactNo.replace(/\s/g, ''))) && contactNo !== '' || isNaN(contactNo.replace(/\s/g, ''))) ? 'error' : ''}`}>
                <label>Contact Number:</label>
                <input
                  type='text'
                  name='contact_no'
                  value={contactNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
                  onChange={handleInputChange}
                />
                <p className="error-message" style={{ color: 'red' }}>
                  {(!/^\+?[0-9]{10}$/.test(contactNo.replace(/\s/g, ''))) && contactNo !== '' ? 'Contact number should be exactly 10 digits' : ''}
                  {(isNaN(contactNo.replace(/\s/g, ''))) ? 'Contact number should contain only digits' : ''}
                </p>
              </div>
            </div>
            <div className={`row ${!image ? 'error' : ''}`}>
              <div className='col-6'>
                <label>Profile Picture:</label>
                <input
                  type='file'
                  name='image'
                  onChange={handleUploadImage}
                />
              </div>
              {image && (
                <div className='col-6'>
                  <button onClick={handleSubmitImage}>Upload</button>
                </div>
              )}
            </div>
            <button type='submit'>Save</button><br></br>
            <label>Add Images As Gallery</label>

            {/* AddImagesModal component for adding images to the gallery */}
            <AddImagesModal
              gallery={gallery}
              onSubmitGallery={handleGallerySubmit}
            />
            <br></br>
            {/* Render gallery images */}
            <div className='gallery' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {gallery &&
                gallery.map((item) => (
                  
                    <div className='imageItem'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='uploadedImage'
                        style={{ width: '100%', height: 'auto', maxWidth: '500px', maxHeight: 'auto' }} // Adjust image size
                      />
                      <div className='imageDetails'>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  
                ))}
            </div>
            <button type='submit'>Save</button>
          </form>
        </div>
        {showError && (
          <div className='errorText'>Please select an image.</div>
        )}
        {showAlert && (
          <div className='alert alert-success' role='alert'>
            Image uploaded successfully!
          </div>
        )}
      </div>
      {/* <NavBar /> */}
    </section>
  );
}
