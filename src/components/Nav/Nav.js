<<<<<<< HEAD
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
=======
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
>>>>>>> b79665d0f9f017614cd7c8f785c1ff2874a74278
