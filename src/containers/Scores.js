<<<<<<< HEAD
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
      office: 'both'
    }
  }


  componentDidMount(){
    this.props.fetchUsers();
}


  render(){
    const { users } = this.props;
    console.log(users);
    if(!users){return(<div>...loading</div>);}
    const scores = _.map(users, (user) => {
      console.log(this.state.office);
      console.log(user);
      if((this.state.office === 'both' || user.office === this.state.office) && user.email !== 'dor@veriests.com') {
        console.log('test');
        return(
          <div className="user" key={user._id}>
            <Link to={`/index/${user.email}`}> {user.email}</Link>
            <div>{user.score}</div>
          </div>
        )
    }
  });

    return (
      <div>
        <header>
          <Nav email={this.props.email ? this.props.email : "" }/>
        </header>
        <div className="scores">
          <div className="scoresTitle">
            <h4>scores</h4>
            <select onChange={(e) => this.setState({office:e.target.value})}>
              <option value='both'>All Offices</option>
              <option value='israel'>Israel</option>
              <option value='serbia'>Serbia</option>
            </select>
           </div>
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
=======
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
>>>>>>> b79665d0f9f017614cd7c8f785c1ff2874a74278
