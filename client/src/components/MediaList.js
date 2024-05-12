import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/MediaList.css';

class MediaList extends Component {
  state = {
    medias: [],
    searchQuery: '', 
    selectedCategory: 'All'
  };

  componentDidMount() {
    this.fetchMedia();
  }

  fetchMedia = () => {
    axios.get('http://localhost:5000/media/')
      .then(response => {
        this.setState({ medias: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleCategoryChange = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    axios.get(`http://localhost:5000/media/search?title=${searchQuery}`)
      .then(response => {
        this.setState({ medias: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLike = (mediaId) => {
    axios.post(`http://localhost:5000/media/like/${mediaId}`)
      .then(response => {
        
        const updatedMedias = this.state.medias.map(media => {
          if (media._id === mediaId) {
            media.likes = response.data.likes;
          }
          return media;
        });
        this.setState({ medias: updatedMedias });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDislike = (mediaId) => {
    axios.post(`http://localhost:5000/media/dislike/${mediaId}`)
      .then(response => {
        
        const updatedMedias = this.state.medias.map(media => {
          if (media._id === mediaId) {
            media.dislikes = response.data.dislikes;
          }
          return media;
        });
        this.setState({ medias: updatedMedias });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { medias, searchQuery, selectedCategory } = this.state;
    
    const filteredMedias = selectedCategory === 'All' ? medias : medias.filter(media => media.category === selectedCategory);

    return (
      <div>
        <h1 className='h1'>Media Content</h1>
        <br></br>
        <form onSubmit={this.handleSearchSubmit}>
          <div className='sml'>
            <input 
              className='searching'
              type="text" 
              placeholder="Search by title..." 
              value={searchQuery} 
              onChange={this.handleSearchChange} 
            />
            <br></br>
            <button className="search_sub">Search</button>
          </div>
        </form>
        <br></br>
        <div>
          <label className="lb1" htmlFor="category">Filter by Category :</label>
          <select id="category" value={selectedCategory} onChange={this.handleCategoryChange}>
            <option value="All">All Categories</option>
            <option value="Photography">Photography</option>
            <option value="YouTuber">YouTuber</option>
            <option value="Blog">Blog</option>
          </select>
        </div>
        <br></br>
        <table className='table'>
          <thead className='table-dark'>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Category</th>
              <th>Content</th>
              <th>Actions</th>
              <th>Likes</th>
              <th>Dislikes</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedias.map(media => (
              <tr key={media._id}>
                <td>{media.title}</td>
                <td>{media.description}</td>
                <td>{media.type}</td>
                <td>{media.category}</td>
                <td>{media.content}</td>
                <td>
                  <button className='th' onClick={() => this.handleLike(media._id)}>Like</button>
                  <button className='th1' onClick={() => this.handleDislike(media._id)}>Dislike</button>
                </td>
                <td>{media.likes}</td>
                <td>{media.dislikes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MediaList;
