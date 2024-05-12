import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../pages/User_UI/U_Pages/footer';
import NavBar from '../components/NavBar';
import { FaEdit, FaTrash } from "react-icons/fa";
import '../Styles/admin.css'
class PortfolioAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      searchQuery: '',
      filteredPosts: [],
    };
  }

  componentDidMount() {
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

  handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const { posts } = this.state;

    // Filter posts based on the search query
    const filteredPosts = posts.filter((post) =>
      post.portfolio_name.toLowerCase().includes(searchQuery)
    );

    this.setState({
      searchQuery,
      filteredPosts,
    });
  };

  onDelete = (id) => {
    axios.delete(`/post/delete/${id}`)
      .then((res) => {
        alert('Delete Successful!');
        this.retrievePosts(); // Refresh posts after deletion
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  handleEdit = (postId) => {
    // Redirect to the edit form with postId as a parameter
    this.props.history.push(`/edit/${postId}`, { postId });
  };

  render() {
    const { filteredPosts } = this.state;
    const numPosts = filteredPosts.length; // Get the number of filtered posts

    return (
    
      <section  className="ml-64 mt-3 px-4">
           <h1 className="text-2xl font-bold mb-4">Portfolio Management</h1>
        <div className="container">
            <div className="mt-2 mb-2">
        <div className="" style={{marginBottom:"2rem",marginTop:"2rem",display:"flex", justifyItems:"center", alignItems:"center", justifyContent:"center"}}>
              <h4>Search</h4>
              <input      className="border border-gray-400 px-3 py-2 rounded-md w-full mb-4 mr-2 ml-2" type="search" placeholder="Search by Name" onChange={this.handleSearch}  />
              </div>
              <h4>All Posts</h4>
            </div>
            <div  className="container mx-auto px-4 py-4 overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-gray-200" style={{background:"#418ca3"}}>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Bio</th>
                <th>Description</th>
                <th>Category</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, index) => (
                <tr key={post._id} className='bg-gradient-to-r from-blue-200 to-white shadow-md mb-2'>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={post?.image?.image}
                      alt="Portfolio"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </td>
                  <td>
                    <a href={`/post/${post._id}/${post.userID}`} style={{ textDecoration: 'none' }}>
                      {post.portfolio_name}
                    </a>
                  </td>
                  <td>{post.bio}</td>
                  <td>{post.description}</td>
                  <td>{post.category}</td>
                  <td>{post.email}</td>
                  <td>{post.contact_no}</td>
                  <td className="py-2 flex justify-center">
                    {/* <button
                      className="btn-portfolio btn-portfolio-warning"
                      onClick={() => this.handleEdit(post._id)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button> */}

                    

                    <a className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded" href={`/editpost/${post._id}`}>
                    <FaEdit className="inline-block mr-1" />&nbsp;Edit
                    </a>



                    &nbsp;
                    <button
                      className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
                      onClick={() => this.onDelete(post._id)}
                    >
                 <FaTrash className="inline-block mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <p>Total Posts: {numPosts}</p>
          <button className="btn-portfolio btn-success">
          
              Create
          </button>
          
        </div>
        <div className='fo'>
          {/* <Footer />
          <NavBar /> */}
        </div>
      </section>
    );
  }
}

export default PortfolioAdmin;
