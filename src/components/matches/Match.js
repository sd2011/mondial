<<<<<<< HEAD
import React  from 'react';
import './matches.css';
const Match = props => {
    const {number, date, time, teamA, teamB, index, handler, color,i} = props;

    return(
      <div className="match">
        <div>Match {number}</div>
        <div>{date}</div>
        <div>{time}</div>
        <div className ="teams">
          <div  className={color[teamA] && color[teamA]}  onClick={() => handler(teamA, number, index, i, teamB)}>{teamA}</div>
          <div> VS </div>
          <div className={color[teamB] && color[teamB]} onClick={() => handler(teamB, number, index, i, teamA)}>{teamB}</div>
        </div>
      </div>
    );
  }

export default Match;
=======
import React  from 'react';
import './matches.css';
const Match = props => {
    const {number, date, time, teamA, teamB, index, handler, color,i} = props;

    return(
      <div className="match">
        <div>Match {number}</div>
        <div>{date}</div>
        <div>{time}</div>
        <div className ="teams">
          <div  className={color[teamA] && color[teamA]}  onClick={() => handler(teamA, number, index, i, teamB)}>{teamA}</div>
          <div> VS </div>
          <div className={color[teamB] && color[teamB]} onClick={() => handler(teamB, number, index, i, teamA)}>{teamB}</div>
        </div>
      </div>
    );
  }

export default Match;
>>>>>>> b79665d0f9f017614cd7c8f785c1ff2874a74278
