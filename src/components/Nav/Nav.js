import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';


const Nav = props => {
  const {email} = props;
  return(
    <div className="nav">
      <Link to={"/index/scores"}>Scores</Link>
      <Link to={`/index/${email}`}>My Betting</Link>
    </div>
  );
}

export default Nav;
