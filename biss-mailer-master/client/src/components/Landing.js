import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
const Landing = () => {
  return (
    <div class='con'>
      <h1 className='dar'> YOUR CLIENT IS OUR CLIENT TOO</h1>
      <h2>DIVE IN AN EXPLORE</h2>
      <Link to='/surveys'>
        <button className='btn waves-effect waves-light btn-large dar'>
          EXPLORE
          <i class='material-icons'>navigation</i>
        </button>
      </Link>
    </div>
  );
};

export default Landing;
