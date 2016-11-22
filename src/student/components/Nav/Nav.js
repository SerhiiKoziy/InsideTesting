import React from 'react';
import {  Link  } from 'react-router'



const Nav = (routes) => (
  <ul>
      {['/', '/page2'].map((route, id) => (
    <li>

        <Link to={route} key={ id}>{route}</Link>


    </li>
      ))
      }
  </ul>
);

// Make ESLint happy again: add validation to props


export default Nav;
