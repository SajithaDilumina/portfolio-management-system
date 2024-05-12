import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/CreatePost.css';
import images from '../images/hero.jpg';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description: '',
      postCategory: '',
      thumbnailImage: '',
      portfolioName: '',
      bio: '',
      email: '',
      contactNumber: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      topic,
      description,
      postCategory,
      thumbnailImage,
      portfolioName,
      bio,
      email,
      contactNumber
    } = this.state;

    const data = {
      topic,
      description,
      postCategory,
      thumbnailImage,
      portfolioName,
      bio,
      email,
      contactNumber
    };

    console.log(data);

    axios
      .post('/post/save', data)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            topic: '',
            description: '',
            postCategory: '',
            thumbnailImage: '',
            portfolioName: '',
            bio: '',
            email: '',
            contactNumber: ''
          });
          alert('Data saved successfully!');
        }
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
        alert('Error saving data. Please try again.');
      });
  };

  render() {
    const {
      topic,
      description,
      postCategory,
      thumbnailImage,
      portfolioName,
      bio,
      email,
      contactNumber
    } = this.state;

    return (
      <section>
        <div className="formuser">
          <div className="image-container">
            <img src={images} alt="Placeholder" />
          </div>
          <div className="form-container">
            <h2>Create New Post</h2>
            <form className="form" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-6">
                  <label>Topic:</label>
                  <input
                    type="text"
                    name="topic"
                    value={topic}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="postCategory"
                    value={postCategory}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label>Portfolio Name:</label>
                  <input
                    type="text"
                    name="portfolioName"
                    value={portfolioName}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label>Bio:</label>
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={this.handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={description}
                    onChange={this.handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
