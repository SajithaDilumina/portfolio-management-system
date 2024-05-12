import axios from 'axios';
import React, { Component } from 'react';
import '../Styles/CreatePost.css';
import AddImagesModal from '../components/AddImagesModal';
import NavBar from '../components/NavBar';
import images from '../images/aa.png';
import Footer from './User_UI/U_Pages/footer';
import Resume from '../components/Image/SkillSync.pdf';
export default class CreatePost extends Component {
  constructor(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    
    super(props);
    this.state = {
      amount: '',
      description: '',
      category: '',
      portfolio_name: '',
      bio: '',
      email: '',
      contact_no: '',
      image: null,
      gallery: [],
      image_id: '',
      showError: false,
      showAlert: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      amount,
      description,
      category,
      portfolio_name,
      bio,
      email,
      contact_no,
      image_id,
      gallery,
    } = this.state;

    if (
      !amount ||
      !description ||
      !category ||
      !portfolio_name ||
      !bio ||
      !email ||
      !contact_no ||
      !image_id
    ) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const userId = user._id;
    
    const data = {
      userID:userId,
      amount,
      description,
      category,
      portfolio_name,
      bio,
      email,
      contact_no,
      gallery,
      image: image_id,
    };

    axios.post('/post/save', data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            amount: '',
            description: '',
            category: '',
            portfolio_name: '',
            bio: '',
            email: '',
            contact_no: '',
            image: null,
            image_id: '',
            gallery: [],

          });
          console.log("respose",res.data)
          alert('Data saved successfully!');
        }
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
        alert('Error saving data. Please try again.');
      });
  };

  handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      this.setState({ showError: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ image: reader.result, showError: false });
    };
    reader.readAsDataURL(file);
  };

  handleSubmitImage = async (e) => {
    e.preventDefault();
    const { image } = this.state;

    if (!image) {
      this.setState({ showError: true });
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
        this.setState(
          (prevState) => ({
            showAlert: true,
            image: null,
            image_id: res.data._id,
          }),
          () => {
            console.log(this.state);
          }
        );
      } else {
        console.error('Failed to upload image:', res.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  handleGallerySubmit = (img, title, description) => {
    const { gallery } = this.state;
    const newGallery = [
      ...gallery,
      {
        image: img,
        title: title,
        description: description,
      },
    ];
    this.setState({ gallery: newGallery });
  };

  render() {
    const {
      amount,
      description,
      category,
      portfolio_name,
      bio,
      email,
      contact_no,
      image,
      showAlert,
      showError,
      gallery,
    } = this.state;

    return (
      <section>
        <div className='formuser'>
          <div className='image-container'>
            <img src={images} alt='Placeholder' />
          </div>
          <div className='form-container'>
            <h2>
              <span style={{ color: 'white', fontWeight: 'bold' }}>Create</span>
              <span style={{ color: 'black', fontWeight: 'bold' }}>
                {' '}
                New Post
              </span>
            </h2>
            <form className='form' onSubmit={this.onSubmit}>
              <div className={`row ${amount ? '' : 'error'}`}>
                <div className='col-6'>
                  <label style={{ fontSize: 'larger' }}>amount:</label>
                  <input
                    type='text'
                    name='amount'
                    value={amount}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className={`col-6 ${!category ? 'error' : ''}`}>
                  <label style={{ fontSize: 'larger' }}>Category:</label>
                  <select
                    name='category'
                    value={category}
                    onChange={this.handleInputChange}
                  >
                    <option value=''>Select Category</option>
                    <option value='Graphic Design'>Graphic Design</option>
                    <option value='Web Design'>Web Design</option>
                    <option value='Illustration'>Illustration</option>
                    <option value='Photography'>Photography</option>
                    <option value='Fine Art'>Fine Art</option>
                    <option value='Digital Art'>Digital Art</option>
                    <option value='Motion Graphics'>Motion Graphics</option>
                    <option value='Typography'>Typography</option>
                    <option value='UI/UX Design'>UI/UX Design</option>
                  </select>
                </div>
              </div>
              <div className={`row ${portfolio_name ? '' : 'error'}`}>
                <div className='col-12'>
                  <label style={{ fontSize: 'larger' }}>Portfolio Name:</label>
                  <input
                    type='text'
                    name='portfolio_name'
                    value={portfolio_name}
                    onChange={this.handleInputChange}
                    onBlur={() => {
                      if (portfolio_name.length > 0)
                        this.setState({
                          portfolio_name:
                            portfolio_name.charAt(0).toUpperCase() +
                            portfolio_name.slice(1),
                        });
                    }}
                  />
                </div>
              </div>
              <div
                className={`row ${
                  bio && bio.split(' ').filter(Boolean).length <= 20
                    ? ''
                    : 'error'
                }`}
              >
                <div className='col-12'>
                  <label style={{ fontSize: 'larger' }}>Bio:</label>
                  <textarea
                    name='bio'
                    value={bio}
                    onChange={this.handleInputChange}
                  ></textarea>
                  <p>
                    {bio.split(' ').filter(Boolean).length > 20
                      ? 'Bio should have less than 20 words'
                      : ''}
                  </p>
                </div>
              </div>
              <div
                className={`row ${
                  description &&
                  description.split(' ').filter(Boolean).length >= 20
                    ? ''
                    : 'error'
                }`}
              >
                <div className='col-12'>
                  <label style={{ fontSize: 'larger' }}>Description:</label>
                  <textarea
                    name='description'
                    value={description}
                    onChange={this.handleInputChange}
                  ></textarea>
                  <p
                    className={`error-message ${
                      description &&
                      description.split(' ').filter(Boolean).length < 20
                        ? 'error'
                        : ''
                    }`}
                  >
                    {description.split(' ').filter(Boolean).length < 20
                      ? 'Description should have at least 20 words'
                      : ''}
                  </p>
                </div>
              </div>
              <div className={`row ${email ? '' : 'error'}`}>
                <div className='col-6'>
                  <label style={{ fontSize: 'larger' }}>Email:</label>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </div>

                <div
                  className={`col-6 ${
                    (!/^\+?[0-9]{10}$/.test(contact_no.replace(/\s/g, '')) &&
                      contact_no !== '') ||
                    isNaN(contact_no.replace(/\s/g, ''))
                      ? 'error'
                      : ''
                  }`}
                >
                  <label style={{ fontSize: 'larger' }}>Contact Number:</label>
                  <input
                    type='text'
                    name='contact_no'
                    value={contact_no.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      '$1 $2 $3'
                    )}
                    onChange={this.handleInputChange}
                    onBlur={() => {
                      if (
                        !/^\+?[0-9]{10}$/.test(contact_no.replace(/\s/g, '')) &&
                        contact_no !== ''
                      ) {
                        this.setState({ contact_no: '' });
                      }
                    }}
                  />
                  <p className='error-message' style={{ color: 'red' }}>
                    {!/^\+?[0-9]{10}$/.test(contact_no.replace(/\s/g, '')) &&
                    contact_no !== ''
                      ? 'Contact number should be exactly 10 digits'
                      : ''}
                    {isNaN(contact_no.replace(/\s/g, ''))
                      ? 'Contact number should contain only digits'
                      : ''}
                  </p>
                </div>
              </div>
              <div className={`row ${!image ? 'error' : ''}`}>
                <div className='col-6'>
                  <label style={{ fontSize: 'larger' }}>Profile Picture:</label>
                  <input
                    type='file'
                    name='image'
                    onChange={this.handleUploadImage}
                  />
                </div>
                {image && (
                  <div className='col-6'>
                    <button onClick={this.handleSubmitImage}>Upload</button>
                  </div>
                )}
              </div>
              <br></br>
              <label style={{ fontSize: 'larger' }}>Add Images As Gallery</label>

              <AddImagesModal
                gallery={gallery}
                onSubmitGallery={this.handleGallerySubmit}
              />
              <br></br>
              {gallery &&
                gallery.map((item) => (
                  <div key={item.title}>
                    <div className='gallery'>
                      <div className='imageItem'>
                        <img
                          src={item.image}
                          alt={item.title}
                          className='uploadedImage'
                        />
                        <div className='imageDetails'>
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <button type='submit'>Save</button>
            </form>
            <br></br>
            <label >You should download and refer to the terms and conditions for a comprehensive understanding of our policies and guidelines.</label>
            <div>
              <button className='download-button'>
                <a href={Resume} download='Resume' style={{ textDecoration: 'none', color: 'white' }}>Download</a>
              </button>
            </div>
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
        {/* <NavBar />
        <Footer /> */}
      </section>
    );
  }
}
