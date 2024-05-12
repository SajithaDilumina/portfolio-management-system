import React, { Component } from 'react'
import '../../User_UI/Styles/services.css'

export default class services extends Component {
  render() {
    return (
      <div>
        <section className="services" id="services">
      <br></br>
  <h4 className="heading">services</h4>

  <div className="services-container">
    <div className="services-box-service">
      <h3>
      Template Portfolio
      </h3>
      <p>Choose from our curated collection of professionally designed portfolio templates. Effortlessly showcase your work and accomplishments with a polished and visually appealing portfolio.

      </p>
      <a href="/add" className="Service-btn">Create Folio</a>
    </div>

    <div className="services-box-service">
      <h3>
      Custom Portfolio
      </h3>
      <p>Tailor your portfolio to match your unique style and personal brand. Our team will work closely with you to create a custom-designed portfolio that reflects your individuality and highlights your skills and achievements.

      </p>
      <a href="/email" className="Service-btn">Create Folio</a>
    </div>

    <div className="services-box-service">
      <h3>
      Educational Videos
      </h3>
      <p>Explore our engaging video content covering success stories, free educational resources, and business knowledge. Immerse yourself in a variety of topics aimed at enhancing your skills, knowledge, and understanding of the business world.
      </p>
      <a href="#" className="Service-btn">Watch Video</a>
    </div>
  </div>
</section>
      </div>
    )
  }
}
