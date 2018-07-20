import './header.css';

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ghlogo from '../../assets/img/github.png';
import sflogo from '../../assets/img/shred-logo.png';
import {authURL} from '../../lib/githubLogin.js';

require('dotenv').config();

/**
 * Header component and function to render.  The header includes the shredfellows *logo and a link to github for authenticaiton.  State is set to a logged in *status of false.
 */
class Header extends Component {
  constructor(props){
    super(props);
    this.state={loggedin: false}
  }

  render() {
    
    return (
      <header className="header">
        <FontAwesomeIcon icon={faBars}/>
        <img alt="shred fellows logo" src={sflogo}/>
        <a href={authURL}>LOGIN OR SIGNUP</a>
        <img className="gh-logo" alt="github octocat logo" src={ghlogo} />
      </header>
    );
  }
}

export default Header;