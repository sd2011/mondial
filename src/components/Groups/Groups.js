import React , {Component} from 'react';
import {connect} from "react-redux";
import _ from "lodash";
import "./Groups.css";
import Team from "./teams";
import { insertGroupsWinners } from "../../actions/index";

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
      return(insertGroupsWinners({groupsWinners, 'email': this.props.user['email']}));
  }
    else {
      return(this.error());
    }
  }

  error(){
  this.setState({error:'please choose only one first place and one second place for each group!'});
}

  render(){
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
            <button>submit betting</button>
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

export default connect( mapStateToProps , {insertGroupsWinners})(Groups);
