import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Nav from '../components/Nav/Nav';
import "./css/container.css";


class Scores extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 'all offices'
    }
    this.change = this.change.bind(this);
  }


  change(){
    const users = _.orderBy(this.props.users ,'score', 'desc');
    const scores = users.map((user) => {
      if((this.state.value === 'all offices' || user.office === this.state.value) && user.email !== 'admin@veriests.com') {
        return(
          <div className="user" key={user._id}>
            <Link to={`/index/${user.email}`}> {user.email.split("@veriests.com")}</Link>
            <div>{user.score}</div>
          </div>
        )
      }
      else{return <div />}
  });
  this.setState({scores});
  }

  render(){
    if(!this.props.users){return(<div>...loading</div>);}
    if(!this.state.scores){return(<div><div>...loading</div>{this.change()}</div>);}
    return (
      <div>
        <header>
          <Nav email={this.props.email ? this.props.email : "" } />
        </header>
        <div className="scores">
          <div className="scoresTitle">
            <h4>scores</h4>
            <select onChange={(e) => this.setState({scores: false, value: e.target.value})}>
              <option vlaue='' disabled selected hidden>{this.state.value}</option>
              <option value='all offices'>all offices</option>
              <option value='israel'>israel</option>
              <option value='serbia'>serbia</option>
            </select>
           </div>
           <div className="usersScores">{this.state.scores}</div>
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



export default connect(mapStateToProps)(Scores);
