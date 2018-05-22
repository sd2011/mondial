import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Matches from "../components/matches/Matches";
import Groups from "../components/Groups/Groups";
import Nav from "../components/Nav/Nav";
import { fetchUser, insertWinners } from "../actions/index";
import moment from 'moment';

class Index extends Component{
  constructor() {
    super();
    this.state = {

      winners:{},
      update: true,
    }
    this.check = this.check.bind(this);
  }

  componentDidMount(){
  const {email} = this.props.match.params;
  this.props.fetchUser({'email': email});
  }

  componentDidUpdate(prevProps, prevState){
    this.props.user.email !== this.props.match.params.email && this.props.history.push('/')
    if ((this.props.user.email !== this.props.currentUser.email || moment('2018-06-13').isBefore()) && this.state.update){
      this.setState({update: false});
    }
    const {top3, winners,color } = this.props.user;
    if(top3 !== prevProps.user.top3 && top3 !== "" ){this.setState({top3 , winners ,color});}
  }


  check(top3, winners,color){
    if(!top3 && this.state.top3 !== ""){return this.setState({top3: "", winners: {},color: {} });}
    if(this.props.currentUser.email === 'dor@veriests.com' && this.state.dor ){
      this.props.insertWinners({top3,winners,color,'email': this.props.user['email']});
      return this.setState({dor: false, submited: "betting has been submitted"});
    }
    const teams = _.map(top3, (team) => {
      if(team !== "?" ){return(team);}
    });
    if (Object.keys(teams).length === 3){
      this.setState({top3, winners,color});
    ;}
  }

  handleSubmit(){
    if(this.props.currentUser.email ==='dor@veriests.com' )
    {return this.setState({dor: true})}
  const {top3, winners,color } = this.state;
    if(top3 && Object.keys(top3).length === 3) {
      this.props.insertWinners({top3,winners,color,'email': this.props.user['email']});
      this.setState({submited: "betting has been submitted"});
    }
    else{this.setState({submited: "plase make sure you have completed your betting" });}
  }

  render(){
    return(
      <div>
        <header>
          <Nav email={this.props.currentUser.email ? this.props.currentUser.email : "" }  />
        </header>
        <Groups update={this.state.update}  />
        <Matches update={this.state.update} check={this.check} dor={this.state.dor} />
        {this.state.update &&  (<button onClick={() => this.handleSubmit() }>
          submit betting
        </button>)}
      <div>{this.state.submited && this.state.submited }</div>
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
return bindActionCreators({fetchUser, insertWinners}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
