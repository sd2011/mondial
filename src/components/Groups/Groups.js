import React , {Component} from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import _ from "lodash";
import "./Groups.css";
import Team from "./teams";
import { insertGroupsWinners, insertWinners } from "../../actions/index";

class Groups extends Component{
  constructor(){
    super();
    this.handler = this.handler.bind(this)
    this.state = {
      groups: {
        "group A": {"Russia": "", "Saudi Arabia": "", "Egypt": "", "Uruguay": ""},
        "group B": {"Portogal": "", "Spain": "", "Morocco": "", "IR Iran": ""},
        "group C": {"France": "", "Australia": "", "Peru": "", "Denmark": ""},
        "group D": {"Argentina": "", "Iceland": "", "croatia": "", "Nigeria": ""},
        "group E": {"Brazil": "", "Swizerland": "", "Costa Rica": "", "Serbia": ""},
        "group F": {"Germany": "", "Mexico": "", "Sweden": "", "Korea Republic": ""},
        "group G": {"Belgium": "", "Panama": "", "Tunisia": "", "England": ""},
        "group H": {"Poland": "", "Senegai": "", "Colombia": "", "Japan": ""}
      },
      error: "",
    };
    this.error = this.error.bind(this);
  }

handler(groups,teams) {
  this.setState({
    groups,
    teams
});
  }

  check(){
    const { groups } = this.state;
    const groupsWinners = {};
    _.forEach(groups, (teams , group) => {
      const count = {};
      const teamsWinners = {};
       _.forEach(teams, (place, team)=> {
        count[place] ? count[place]++ : count[place] = 1;
        if(place !== "") {teamsWinners[place]=team;}
      });
      if(count[1] === 1 && count[2] === 1){groupsWinners[group] = teamsWinners;}
      });
    if(Object.keys(groupsWinners).length === 8){
      return(this.props.insertGroupsWinners({groupsWinners, 'email': this.props.user['email']}));
  }
    else {
      return(this.error(1));
    }
  }

  error(number){
  number === 1 && this.setState({error:'please choose only one first place and one second place for each group!'});
  number === 2 && this.setState({error:'please make sure you have completed all of your betting!'});
}

  render(){
    const {top3, winners} = this.props;
    const renderGroups = _.map(this.state.groups, (group, i) => {
      return(
        <div key={i}>
          <div>{i}</div>
          <div className="group">
            <Team
             groups={this.state.groups}
             teams={group}
             group={i}
             setState={this.handler}
            />
          </div>
        </div>
    );
    });
    return(
      <div>
        <div className="groups">
            {renderGroups}
        </div>
        <div>
          <div>
            <button onClick={() => this.check()}>submit groups</button>
            <button onClick={() => Object.keys(top3).length === 3 ? this.props.insertWinners({top3, winners,'email': this.props.user['email']}) : this.error(2) }>submit betting</button>
          </div>
          <div className="error">{this.state.error}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    user: state.user
};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    insertGroupsWinners,
    insertWinners
  }, dispatch);
}

export default connect( mapStateToProps , mapDispatchToProps)(Groups);
