import React, { Component } from 'react';
import './matches.css';
class Match extends Component{


  render(){
    const {number, date, time, teamA, teamB, index, handler, color,i} = this.props;

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
}

export default Match;
