import React  from 'react';
import './matches.css';
const Match = props => {
    const {number, date, teamA, teamB, index, handler, color,i} = props;
    return(
      <div>
      <div>{number === '64' && (<div className="title">Finals!</div>)}</div>
        <div className={number === '63' ? "nope" : "match"}>
          <div>Match {number}</div>
          <div>{date[number]}</div>
          <div className ="teams">
            <div  className={color[teamA] && color[teamA]}  onClick={() => handler(teamA, number, index, i, teamB)}>{teamA}</div>
            <div className="vs">VS</div>
            <div className={color[teamB] && color[teamB]} onClick={() => handler(teamB, number, index, i, teamA)}>{teamB}</div>
          </div>
        </div>
      </div>
    );
  }

export default Match;
