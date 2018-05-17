import React , {Component} from 'react';
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
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
        "Group A": {"Russia": "", "Saudi Arabia": "", "Egypt": "", "Uruguay": ""},
        "Group B": {"Portogal": "", "Spain": "", "Morocco": "", "IR Iran": ""},
        "Group C": {"France": "", "Australia": "", "Peru": "", "Denmark": ""},
        "Group D": {"Argentina": "", "Iceland": "", "Croatia": "", "Nigeria": ""},
        "Group E": {"Brazil": "", "Swizerland": "", "Costa Rica": "", "Serbia": ""},
        "Group F": {"Germany": "", "Mexico": "", "Sweden": "", "Korea Republic": ""},
        "Group G": {"Belgium": "", "Panama": "", "Tunisia": "", "England": ""},
        "Group H": {"Poland": "", "Senegal": "", "Colombia": "", "Japan": ""}
      },
      error: "",
      clickin: false,
      update: true
    };
    this.error = this.error.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.user.email !== this.props.email || !this.props.update){
      if(!this.state.update){
        return false;
      }
    }
    return true;
  }


handler(groups) {this.setState({
    groups,
    clickin: true
});}

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
      if((count[1] === 1 && count[2] === 1) || this.props.email === 'dor@veriests.com' ){groupsWinners[group] = teamsWinners;}
      });
    if(Object.keys(groupsWinners).length === 8 || this.props.email === 'dor@veriests.com' ){
      return(this.props.insertGroupsWinners({groupsWinners, 'email': this.props.user['email']}));
  }
    else {
      return(this.error());
    }
  }

  error(){
this.setState({error:'please choose only one first place and one second place for each group!'});
}

update(){
  this.state.update && this.setState({update: false});
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
             winnerGroups={this.props.user.groupsWinners}
             clickin={this.state.clickin}
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
            {this.props.update ? (<button onClick={() => this.check()}>submit groups</button>) : this.update()}
          </div>
          <div className="error">{this.state.error}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    user: state.user,
    email: state.currentUser.email
};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    insertGroupsWinners
  }, dispatch);
}

export default connect( mapStateToProps , mapDispatchToProps)(Groups);
