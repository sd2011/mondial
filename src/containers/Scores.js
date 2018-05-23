import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Nav from '../components/Nav/Nav';
import { fetchUsers } from '../actions/index';
import "./css/container.css";


class Scores extends Component {
  constructor(props){
    debugger;
    super(props);
    this.state = {
    }
    this.change = this.change.bind(this);
  }


  componentDidMount(){
    this.props.fetchUsers();
}


  change(value){
    const users = _.orderBy(this.props.users ,'score', 'desc');
    console.log(users);
    const scores = users.map((user) => {
      if((value === 'both' || user.office === value) && user.email !== 'admin@veriests.com') {
        console.log('test');
        return(
          <div className="user" key={user._id}>
            <Link to={`/index/${user.email}`}> {user.email}</Link>
            <div>{user.score}</div>
          </div>
        )
      }
      else{return <div />}
  });

  this.setState({scores})
  }

  render(){
    if(!this.props.users){return(<div>...loading</div>);}
    return (
      <div>
        <header>
          <Nav email={this.props.email ? this.props.email : "" } />
        </header>
        <div className="scores">
          <div className="scoresTitle">
            <h4>scores</h4>
            <select onChange={(e) => this.change(e.target.value)}>
              <option value='both'>All Offices</option>
              <option value='israel'>Israel</option>
              <option value='serbia'>Serbia</option>
            </select>
           </div>
           <div className="usersScores">{this.state.scores ? this.state.scores : this.change('both') }</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    users: state.users.users,
    email:state.currentUser.email
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUsers}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Scores);
