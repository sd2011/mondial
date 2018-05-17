import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Nav from '../components/Nav/Nav';
import { fetchUsers } from '../actions/index';
import "./container.css";


class Scores extends Component {


  componentDidMount(){
    this.props.fetchUsers();
}


  render(){
    const { users } = this.props;
    if(!users){return(<div>...loading</div>);}
    const scores = _.map(users, (user) => {
      return(<div>{user.email !== 'dor@veriests.com' && (
        <div className="user" key={user._id}>
          <Link to={`/index/${user.email}`}> {user.email}</Link>
          <div>{user.score}</div>
        </div>
      )}</div>)
    });

    return (
      <div>
        <header>
          <Nav email={this.props.email ? this.props.email : "" }/>
        </header>
        <div className="scores">
          <div className="scoresTitle">scores</div>
          <div className="usersScores">{scores}</div>
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
