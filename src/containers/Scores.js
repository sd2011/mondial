import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Nav from '../components/Nav/Nav';
import "./css/container.css";
import { fetchUsers } from '../actions/index';


class Scores extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 'all offices',
      start: 0,
    }
    this.change = this.change.bind(this);
    this.clicked = this.clicked.bind(this);
    this.changing = this.changing.bind(this);
  }

  componentDidMount(){
    this.props.fetchUsers({'first': 0, 'office': 'all offices'});
  }
  componentDidUpdate(prevProps,prevState){
  this.props.users !== prevProps.users && this.setState({scores: false});
  }

  clicked(option){
    if(option === 1){
       this.props.fetchUsers({"first": (this.state.start + 16),'office': this.state.value});
       this.setState({start: (this.state.start + 16)});
    }
    else {
      this.props.fetchUsers({"first": (this.state.start - 16),'office': this.state.value});
      this.setState({start: (this.state.start - 16)});
    }
  }

  change(){
    const users = _.orderBy(this.props.users ,'score', 'desc');
    const scores = users.map((user) => {
        return(
          <div className="user" key={user._id}>
            <Link to={`/index/${user.email}`}> {user.email.split("@veriests.com")}</Link>
            <div>{user.score}</div>
          </div>
        )
      }
  );
  this.setState({scores});
  }

  changing(e){
    this.props.fetchUsers({ "first": 0,'office': e.target.value});
    this.setState({scores: false, value: e.target.value, start: 0});
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
            <select onChange={this.changing}>
              <option vlaue='' disabled selected hidden>{this.state.value}</option>
              <option value='all offices'>all offices</option>
              <option value='israel'>israel</option>
              <option value='serbia'>serbia</option>
            </select>
           </div>
           <div className="usersScores">{this.state.scores}</div>
           <div className ="order">
            {this.state.start !== 0 && (<div onClick={() => this.clicked(2)}> &lt;&lt;&lt;prev </div>)}
            {Object.keys(this.state.scores).length === 16 && this.state.start !== 0 && (<div> | </div>)}
            {Object.keys(this.state.scores).length === 16 && (<div onClick={() => this.clicked(1)}> next &gt;&gt;&gt;</div>)}
           </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers }, dispatch);
}

function mapStateToProps(state){
  return{
    users: state.users.users,
    email:state.currentUser.email
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(Scores);
