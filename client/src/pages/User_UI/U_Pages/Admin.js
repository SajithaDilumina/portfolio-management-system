import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Admin extends Component {
  render() {
    return (
      <div>
        
        <button className='admin'>
          <a href='/PortfolioAdmin' style={{ textDecoration: 'none', color: 'white' }}>
            User View Portfolio
          </a>
        </button>

       {/* <Link to={"/services"}>
       <button className="btn btn-success"><a href= "/services" style={{textDecoration:'none',color:'white'}}>Services</a></button>
       </Link>

       <Link to={"/visit"}>
       <button className="btn btn-success"><a href= "/visit" style={{textDecoration:'none',color:'white'}}>Services</a></button>
       </Link>
*/}
       <Link to={"/vchat"}>
       <button className="btn btn-success"><a href= "/vchat" style={{textDecoration:'none',color:'white'}}>Video call</a></button>
       </Link> 



       
      </div>
    )
  }
}
