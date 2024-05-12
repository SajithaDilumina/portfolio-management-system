import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import '../Styles/home.css';
// import NavBar from '../components/NavBar';
import Gallery from './User_UI/U_Pages/Gallery';
import Footer from './User_UI/U_Pages/footer';
import Services from './User_UI/U_Pages/services';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = ({ numPosts }) => {
  const [visitCount, setVisitCount] = useState(0);

  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/posts');
        console.log(data.existingPosts);
        setPostCount(data?.existingPosts?.length);
        return data.existingPosts;
      } catch (error) {
        console.log(error)
      }finally{
      setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // Retrieve the visit count from localStorage on component mount
    const storedCount = localStorage.getItem('visitCount');
    const parsedCount = parseInt(storedCount);

    // If a valid visit count is found in localStorage, update the state
    if (!isNaN(parsedCount)) {
      setVisitCount(parsedCount);
    }

    // Increment the visit count and update localStorage
    const newVisitCount = parsedCount + 1;
    setVisitCount(newVisitCount);
    localStorage.setItem('visitCount', newVisitCount.toString());
  }, []); // Empty dependency array ensures this effect runs only on component mount

  if (loading) <div>loading...</div>
    return (
      <div>
        <div className='ccontainer'>
          {/* Hero Section */}

          <div className='kk'>
            <div className='color'></div>
          </div>
          <div className='mm'>
            <div className='hero'>
              <div className='herodesc'>
                <h1>
                  " CREATING STORIES IN PIXEL.
                  <br />
                  ELEVATE YOUR MOMENTS.
                  <br />
                  NOW.LET'S "
                </h1>

                <Link to={'/servicespage'}>
                  <button className='create-button'>
                    <a href='/servicespage'>Create Portfolio</a>
                  </button>
                </Link>

                {/* <button className="create-button">Create Portfolio</button> */}
              </div>
              <div className='contain'>
                {/* Boxes for Hero Section */}
                <div className='box box-1' data-text='Graphic Design'></div>
                <div className='box box-2' data-text='Web Design'></div>
                <div className='box box-3' data-text='Illustration'></div>
                <div className='box box-4' data-text='Photography'></div>
                <div className='box box-5' data-text='UI/UX Design'></div>
              </div>
            </div>
          </div>
          {/* Statistics Section */}

          <div className='rr'>
            <section className='Numbering_Section'>
              <div className='container grid_four_column'>
                <div>
                  <h2 id='visitcount' className='number'>
                    <CountUp start={0} end={visitCount} duration={6} />
                  </h2>
                  <p>Visit Counter</p>
                </div>
                <div>
                  <h2 id='number' className='number'>
                    <CountUp start={0} end={367} duration={6} />
                  </h2>

                  <p>Custom portfolio</p>
                </div>
                <div>
                  <h2 id='number' className='number'>
                    <CountUp start={0} end={postCount} duration={6} />
                  </h2>
                  <p>Template Portfolio</p>
                </div>
                <div>
                  <h2 id='number' className='number'>
                    <CountUp start={0} end={98} duration={6} />%
                  </h2>
                  <p>Customer Satisfaction</p>
                </div>
              </div>
            </section>
          </div>
          {/* Navigation Bar */}
          {/* <NavBar /> */}
        </div>
        {/* Services Component */}
        <Services />
        <Gallery />
        {/* <Footer /> */}
      </div>
    );
};

export default Home;
