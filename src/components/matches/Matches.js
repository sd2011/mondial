import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import Match from "./Match";
import './matches.css';
class Matches extends Component {
  constructor() {
    super();
    this.state = {
        check: false,
        winners: {
          1: {49: ["?", "?"], 50: ["?", "?"], 53: ["?", "?"], 54: ["?", "?"]},
          2: {57: ["?", "?"], 58: ["?", "?"]},
          3: {61: ["?", "?"]},
          4: {64: ["?", "?"], 63: ["?", "?"]},
          5: {62: ["?", "?"]},
          6: {59: ["?", "?"], 60: ["?", "?"]},
          7: {51: ["?", "?"], 52: ["?", "?"], 55: ["?", "?"], 56: ["?", "?"]}
      },
      color: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {}
      },
      top3:{}
    };
    this.handler = this.handler.bind(this);
  }

  winnersToState() {
    const {groupsWinners} = this.props;
    if(!this.state.check && groupsWinners !== ""){
      this.setState(prevstate => ({
        check: true,
        winners: {
          ...prevstate.winners,
          1: {
            49: [groupsWinners['group A'][1], groupsWinners['group B'][2]],
            50: [groupsWinners['group C'][1], groupsWinners['group D'][2]],
            53: [groupsWinners['group E'][1], groupsWinners['group F'][2]],
            54: [groupsWinners['group G'][1], groupsWinners['group H'][2]],
          },
          7:{
            51: [groupsWinners['group B'][1], groupsWinners['group A'][2]],
            52: [groupsWinners['group D'][1], groupsWinners['group C'][2]],
            55: [groupsWinners['group F'][1], groupsWinners['group E'][2]],
            56: [groupsWinners['group H'][1], groupsWinners['group G'][2]],
          }
        }
      }))
    }
  }

  settingWinners(winner, column, match, place, i, loser, matchNumber) {
    const color = this.state.color;
    const winners = this.state.winners;
    console.log(matchNumber);
    if (matchNumber < 63){
      color[column][match]="";
      color[i][matchNumber] = {
      ... color[i],
      [winner]: "blue",
      [loser]: ""
    };
  }
  else if (matchNumber === "64"){
      const top3 = this.state.top3
      if (color[i][63] === winner) {color[i][63]="";}
      let loserColor = "";
      if (loser !== "?") {loserColor = "silver";}
      color[i][matchNumber] = {
        [winner]: "gold",
        [loser]: loserColor
      }
    top3[1] = winner;
    top3[2] = loser;
    return(this.setState({
      top3,
      color
    }));
  }
    else {
      const top3 = this.state.top3
      if (color[i][64] === winner) {color[i][64]="";}
      color[i][matchNumber] = {
        [winner]: "bronze",
        [loser]: ""
      }
      top3[3] = winner;
      return(this.setState({
        top3,
        color
     }));
   }

    winners[column][match][place] = winner;
    if(column === 4){winners[column][match-1][place] = loser;}
    if(matchNumber < 61){
      _.forEach(winners, (row, index) => {
        _.forEach(row, (matches, number) =>{
          if (number > matchNumber){
            if(winners[index][number][0] === loser){winners[index][number][0] = "?";}
            if(winners[index][number][1] === loser){winners[index][number][1] = "?";}
          }
        });
      });
   }
      this.setState({
        winners,
        color
      });
  }

  handler(winner, number, place, i, loser){
    if(winner !== "?"){
      switch (true) {
        case (number < 51):
        this.settingWinners(winner, 2 , 57 , place, i, loser, number);
        break;
        case (number > 50 && number < 53):
        this.settingWinners(winner, 6 , 59 , place, i, loser, number);
        break;
        case (number > 52 && number < 55 ):
        this.settingWinners(winner, 2 , 58 , place - 2, i, loser, number);
        break;
        case (number > 54 && number < 57 ):
        this.settingWinners(winner, 6 , 60 , place - 2, i, loser, number);
        break;
        case (number > 56 && number < 59 ):
        this.settingWinners(winner, 3 , 61 , place, i, loser, number);
        break;
        case (number > 58 && number < 61 ):
        this.settingWinners(winner, 5 , 62 , place, i, loser, number);
        break;
        case (number > 60 && number < 62 ):
        this.settingWinners(winner, 4 , 64 , 0, i, loser, number);
        break;
        case (number > 61 && number < 63):
        this.settingWinners(winner, 4 , 64 , 1, i, loser, number);
        break;

        default:
        return(this.settingWinners(winner, 0 , 0 , 0, i, loser, number));
      }
    }
  }

  renderMatches(column,i){
      const columns = _.map(column, (teams, number) =>
    <div key={number.toString()} id={"match"+number.toString()}>
    {this.renderMatch(teams, number, Object.keys(column).indexOf(number), i)},
    </div>
  );
      return(<div className="column">{columns}</div>);
  }

  renderMatch(teams, number, index, i){
    return (
        <Match
         number={number}
         date="date"
         time="time"
         teamA={teams[0]}
         teamB={teams[1]}
         index={index}
         i={i}
         handler={this.handler}
         color={this.state.color[i][number] ? this.state.color[i][number] : "" }
          />
     );
  }

  render(){
    console.log(this.state.top3);
    const {winners} = this.state;
    const {groupsWinners} = this.props;
    console.log(groupsWinners);
    groupsWinners && this.winnersToState();
    const matches = _.map(winners, (column, i) =>
     <div key={i} id={"column"+i}>
     {this.renderMatches(column,i)}
     </div>
   );
    return(<div className="matches">{matches}</div>);
  }
}

function mapStateToProps(state){
  return{
    groupsWinners: state.user.groupsWinners
  }
}

export default connect(mapStateToProps)(Matches);
