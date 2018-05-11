import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Nav from '../components/Nav/Nav';
import { fetchUsers } from '../actions/index';


class Scores extends Component {


  componentDidMount(){
    this.props.fetchUsers();
    console.log('yes');
}


  render(){
    const { users } = this.props;
    if(!users){return(<div>...loading</div>);}
    const scores = _.map(users, (user) => {
      return(
        <div key={user._id}>
          <Link to={`/index/${user.email}`}> {user.email}</Link>
          <div>0</div>
        </div>
      );
    });

    return (
      <div>
        <header>
          <Nav email={this.props.email ? this.props.email : "" }/>
        </header>
        <div>
          <div>scores</div>
          <div>{scores}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    users: state.users,
    email:state.currentUser.email
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUsers}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Scores);
