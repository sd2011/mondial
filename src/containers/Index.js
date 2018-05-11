import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Matches from "../components/matches/Matches";
import Groups from "../components/Groups/Groups";
import Nav from "../components/Nav/Nav";
import { fetchUser } from "../actions/index";

class Index extends Component{
  constructor() {
    super();
    this.state = {
      top3: {},
      winners: {},
    }
    this.check = this.check.bind(this);
  }

  componentDidMount(){
  const {email} = this.props.match.params;
  this.props.fetchUser({'email': email});
  }



  check(top3, winners){
    const teams = _.map(top3, (team) => {
      if(team !== "?" ){return(team);}
    });
    if (Object.keys(teams).length === 3){this.setState({top3,winners,submited: "your betting as been submited"});}
  }

  render(){
    return(
      <div>
        <header>
          <Nav email={this.props.currentUser.email ? this.props.currentUser.email : "" }  />
        </header>
        <Matches check={this.check} />
        <Groups top3={this.state.top3} winners={this.state.winners}  />
        <div>{this.state.submited && this.state.submited}</div>
      </div>
    );
  }
}


function mapStateToProps(state){
return {
  user: state.user,
  currentUser: state.currentUser
};
}

function mapDispatchToProps(dispatch){
return bindActionCreators({fetchUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
