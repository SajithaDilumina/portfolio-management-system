import axios from 'axios';
import React, { Component } from 'react';
import '../Styles/CreatePost.css';
import AddImagesModal from '../components/AddImagesModal';
// import NavBar from '../components/NavBar';
import images from '../images/aa.png';
import Footer from './User_UI/U_Pages/footer';

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
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
      topic,
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
      !topic ||
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

    const data = {
      topic,
      description,
      category,
      portfolio_name,
      bio,
      email,
      contact_no,
      gallery,
      image: image_id,
    };

    axios
      .post('/post/save', data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            topic: '',
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
      topic,
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
          
                 
              

              <label>Add Images As Gallery</label>

              <AddImagesModal
                gallery={gallery}
                onSubmitGallery={this.handleGallerySubmit}
              />
              <br></br>
          {gallery &&
            gallery.map((item) => (
              <div  key={item.title}>
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
        <Footer />
      </section>
    );
  }
}
export default AddImage;
