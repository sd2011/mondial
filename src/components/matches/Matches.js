import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import Match from "./Match";
import './matches.css';
class Matches extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.state = {
      color: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {}
      },
      top3:{},
      ok: true,
      check: false
    };
   this.start = this.start.bind(this);
    this.handler = this.handler.bind(this);
  }

  shouldComponentUpdate(nextProps,nextState){
    if (this.state.check === true){
      if(!nextProps.update){
        return false;
     }
  }

  return true;
}

  componentDidUpdate(prevProps, prevState){
    if(this.state.ok === true || this.props.admin ){
      if(this.state.ok === prevState.ok || this.props.admin){this.props.check(this.state.top3, this.state.winners, this.state.color)}
    }
    if (!this.state.ok && !this.props.admin && prevState.winners){this.props.check(false);}
    if(this.props.groupsWinners !== prevProps.groupsWinners && this.props.groupsWinners !== "" && !this.state.winners ){this.winnersToState();}
    if(!this.state.winners &&  this.props.winners !== "") {
      this.setState({
      winners: this.props.winners,
      color: this.props.color,
      top3: this.props.top3,
      check: true
    });
    }

  }


  start(){
    return({
      1: {49: ["?", "?"], 50: ["?", "?"], 53: ["?", "?"], 54: ["?", "?"]},
      2: {57: ["?", "?"], 58: ["?", "?"]},
      3: {61: ["?", "?"]},
      4: {64: ["?", "?"], 63: ["?", "?"]},
      5: {62: ["?", "?"]},
      6: {59: ["?", "?"], 60: ["?", "?"]},
      7: {51: ["?", "?"], 52: ["?", "?"], 55: ["?", "?"], 56: ["?", "?"]}
  });
  }


  winnersToState() {
    const {groupsWinners} = this.props;
    const start = this.start();
    const winners = {
    ...start,
    1: {
      49: [groupsWinners['Group A'][1], groupsWinners['Group B'][2]],
      50: [groupsWinners['Group C'][1], groupsWinners['Group D'][2]],
      53: [groupsWinners['Group E'][1], groupsWinners['Group F'][2]],
      54: [groupsWinners['Group G'][1], groupsWinners['Group H'][2]],
    },
    7:{
      51: [groupsWinners['Group B'][1], groupsWinners['Group A'][2]],
      52: [groupsWinners['Group D'][1], groupsWinners['Group C'][2]],
      55: [groupsWinners['Group F'][1], groupsWinners['Group E'][2]],
      56: [groupsWinners['Group H'][1], groupsWinners['Group G'][2]],
    }};

      this.setState({
          winners
        })
    }




  settingWinners(winner, column, match, place, i, loser, matchNumber) {
    const color = this.state.color;
    const winners = this.state.winners;
    if (matchNumber < 63){
      if(color[column][match]){color[column][match][loser] = "" ;}
      color[i][matchNumber] = {
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
    top3['1'] = winner;
    top3['2'] = loser;
    return(this.setState({
      top3,
      color,
      ok: true
    }));
  }
    else {
      const top3 = this.state.top3
      if (color[i][64] === winner) {color[i][64]="";}
      color[i][matchNumber] = {
        [winner]: "bronze",
        [loser]: ""
      }
      top3['3'] = winner;
      return(this.setState({
        top3,
        color,
        ok: true
     }));
   }
    winners[column][match][place] = winner;
    if(column === 4){winners[column][match-1][place] = loser;}
    if(matchNumber < 61){
      _.forEach(winners, (row, index) => {
        _.forEach(row, (matches, number) =>{
          if (number > matchNumber){
            const first = winners[index][number][0];
            const second = winners[index][number][1];
            if(first === loser ){winners[index][number][0] = "?";}
            if(second === loser ){winners[index][number][1] = "?";}

          }
        });
      });
   }
      this.setState({
        winners,
        color,
        ok: true
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
    const {ok} = this.state;
    if(ok === true && (teams[0] === "?" || teams[1] === "?") ) {this.setState({ok: false});}
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
    if(!this.props.color) {return(<div> ...loading </div>);}
    const { winners } = this.state;
    const show = winners ? winners : this.start();
    const matches = _.map(show, (column, i) =>
     <div key={i} id={"column"+i}>
     {this.renderMatches(column,i)}
     </div>
   );
    return(
        <div className="matches">{matches}</div>
    );
  }
}

function mapStateToProps(state){
  return{
    groupsWinners: state.user.groupsWinners,
    winners: state.user.winners,
    color: state.user.color,
    email: state.user.email,
    top3: state.user.top3,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Matches);
