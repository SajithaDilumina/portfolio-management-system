import React, { Component } from 'react';
import { FiUpload } from 'react-icons/fi';
import '../Styles/addimage.css';


class AddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
            title: '',
            description: '',
            showAlert: false,
            showError: false,
            images: [],
            editingImageId: null
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
            this.setState({ img: reader.result, showError: false });
        };
        reader.readAsDataURL(file);
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { img, title, description } = this.state;

        if (!img) {
            this.setState({ showError: true });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/images/upload", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: img, title: title, description: description })
            });

            if (response.ok) {
                this.setState({ showAlert: true, img: null, title: '', description: '' });
                this.fetchImages(); // Refresh images after successful upload
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    handleDeleteImage = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/images/delete/${id}`, {
                method: "DELETE"
            });

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
            const response = await fetch(`http://localhost:5000/images/update/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle, description: newDescription })
            });

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
        this.setState({ editingImageId: id, title: title, description: description });
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
    }

    render() {
        const { img, title, description, showAlert, showError, images, editingImageId } = this.state;

        return (
            <div className="imageContainer">
                <form onSubmit={this.handleSubmit} className="uploadSection">
                    <label htmlFor="uploadImage" className="uploadBox">
                        {img ? <img src={img} alt="Uploaded" className="uploadPreview" /> : <FiUpload className="uploadIcon" />}
                        <input type="file" id="uploadImage" onChange={this.handleUploadImage} style={{ display: 'none' }} />
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => this.setState({ title: e.target.value })}
                        className="inputField"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        className="inputField"
                    />
                    <button type="submit" className="uploadButton">
                        Upload
                    </button>
                    {showError && (
                        <div className="errorText">
                            Please select an image.
                        </div>
                    )}
                    {showAlert && (
                        <div className="alert alert-success" role="alert">
                            Image uploaded successfully!
                        </div>
                    )}
                </form>

                <div className="gallery">
                    {images.map((image) => (
                        <div key={image._id} className="imageItem">
                            <img src={image.image} alt={image.title} className="uploadedImage" />
                            <div className="imageDetails">
                                {editingImageId === image._id ? (
                                    <form onSubmit={this.handleEditSubmit}>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                            className="editField"
                                        />
                                        <textarea
                                            value={description}
                                            onChange={(e) => this.setState({ description: e.target.value })}
                                            className="editField"
                                        />
                                        <button type="submit" className="updateButton">
                                            Save
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <h4>{image.title}</h4>
                                        <p>{image.description}</p>
                                        <button onClick={() => this.handleDeleteImage(image._id)} className="deleteButton">
                                            Delete
                                        </button>
                                        <button onClick={() => this.handleEditClick(image._id, image.title, image.description)} className="editButton">
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AddImage;

