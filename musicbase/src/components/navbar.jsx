import React, { Component } from 'react';
import './navbar.css';

class Navbar extends Component {
  state={clicked: false};
  handleclick = () =>{
    this.setState({clicked: !this.state.clicked})
  }
  render(){
  return (

    <div className='navbar'>
      <h1 className='logo' ><a href="/">TUBE BGMS</a></h1>
      
      <ul>
    
        <li ><a href="/findit">Findit</a></li>
        <li ><a href="/services">Telugu</a></li>
        <li><a href="/contact">Contact us</a></li>
        <li><a href="/upload">Upload</a></li>
      </ul>
      {/* <div className='search-box'>
        <input type='text' placeholder='search' />
      </div> */}
      <div id="mobile" onClick={this.handleclick}>
        <i  className={this.state.clicked ? 'fas fa-times': 'fas fa-bars'}></i>
        
      </div>
    </div>
  );
}
}
export default Navbar;
