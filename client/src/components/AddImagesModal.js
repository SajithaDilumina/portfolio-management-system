import React, { Component } from 'react';
import { FiUpload } from 'react-icons/fi';
import '../Styles/addimage.css';

class AddImagesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      gallery: props.gallery,
      showAlert: false,
      showError: false,
      editingImageId: null,
    };
  }

  handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      this.setState({ showError: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, { img, title: '', description: '' }],
        showError: false,
      }));
    };
    reader.readAsDataURL(file);
  };



  handleSubmit = async (e) => {
    e.preventDefault();
    const { gallery } = this.state;

    // Handle submission for each gallery item
    gallery.forEach(async (item) => {
      const { img, title, description } = item;
      if (!img) {
        this.setState({ showError: true });
        return;
      }

      // You can call the onSubmitGallery prop here for each item
      this.props.onSubmitGallery(img, title, description);
    });

    // Clear the form after submission
    this.setState({
      gallery: [],
      showAlert: true,
    });
  };

  handleDeleteImage = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/images/delete/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        this.setState({ showAlert: true });
        this.fetchImages(); // Refresh images after deletion
      } else {
        console.error('Failed to delete image.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  handleUpdateImage = async (id, newTitle, newDescription) => {
    try {
      const response = await fetch(
        `http://localhost:5000/images/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
          }),
        }
      );

      if (response.ok) {
        this.setState({ showAlert: true });
        this.fetchImages(); // Refresh images after update
      } else {
        console.error('Failed to update image.');
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  handleEditClick = (id, title, description) => {
    this.setState({
      editingImageId: id,
      title: title,
      description: description,
    });
  };

  handleEditSubmit = async (e) => {
    e.preventDefault();
    const { editingImageId, title, description } = this.state;

    if (!editingImageId) {
      return;
    }

    try {
      await this.handleUpdateImage(editingImageId, title, description);
      this.setState({ editingImageId: null, title: '', description: '' });
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  
  render() {
    const { gallery, showAlert, showError } = this.state;
    
    return (
      <section>
        <button
          type='button'
          data-bs-toggle='modal'
          data-bs-target='#exampleModal'
        >
          Add Image to Gallery
        </button>

        <div
          className='modal fade'
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Add Your Images
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <div className='imageContainer' style={{marginTop:'-100px'}}> 
                  <form onSubmit={this.handleSubmit} className='uploadSection'>
                    <h5 className='title'>Add Your Image</h5>
                    <br></br>
                    <label htmlFor='uploadImage' className='uploadBox'>
                      <FiUpload  style={{marginLeft:"7rem"}}className='uploadIcon' />
                      <input
                        type='file'
                        id='uploadImage'
                        onChange={this.handleUploadImage}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {/* Display uploaded images */}
                    {gallery.length > 0 && gallery.map((item, index) => (
                      <div key={index}>
                        <img
                          src={item.img}
                          alt='Uploaded'
                          className='uploadPreview'
                        />
                        <input
                          type='text'
                          placeholder='Title'
                          value={item.title}
                          onChange={(e) => {
                            const updatedGallery = [...gallery];
                            updatedGallery[index].title = e.target.value;
                            this.setState({ gallery: updatedGallery });
                          }}
                          className='inputField'
                        />
                        <textarea
                          placeholder='Description'
                          value={item.description}
                          onChange={(e) => {
                            const updatedGallery = [...gallery];
                            updatedGallery[index].description = e.target.value;
                            this.setState({ gallery: updatedGallery });
                          }}
                          className='inputField'
                        />
                      </div>
                    ))}

                    {showError && (
                      <div className='errorText'>Please select an image.</div>
                    )}
                    {showAlert && (
                      <div className='alert alert-success' role='alert'>
                        Images uploaded successfully!
                      </div>
                    )}
                  </form>
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' onClick={this.handleSubmit}>
                  Add Images
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AddImagesModal;
