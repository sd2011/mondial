import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Matches from "../components/matches/Matches";
import Groups from "../components/Groups/Groups";
import Nav from "../components/Nav/Nav";
import { fetchUser, insertWinners, fetchEnd, insertEnd } from "../actions/index";

class Index extends Component{
  constructor() {
    super();
    this.state = {
      clear: "none",
      winners:{},
      update: true,
    }
    this.check = this.check.bind(this);
  }

  componentDidMount(){
  const {email} = this.props.match.params;
  this.props.fetchUser({'email': email});
  this.props.fetchEnd();
  }

  componentDidUpdate(prevProps, prevState){
    this.state.clear !== "none" && this.setState({clear:"none"});
    if(this.props.user.lies || this.props.user.email !== this.props.match.params.email){this.props.history.push('/');}
    if ((this.props.user.email !== this.props.currentUser.email || !this.props.end) && this.state.update && this.props.currentUser.email !== 'admin@veriests.com'){
      this.setState({update: false});
    }
    if(this.props.user.email === this.props.currentUser.email && this.props.end && !this.state.update){this.setState({update: true});}
    const {top3, winners,color } = this.props.user;
    if(top3 !== prevProps.user.top3 && top3 !== "" ){this.setState({top3 , winners ,color});}
    if(this.props.user.winners === 'lies' && prevProps.user.winners !== 'lies'){this.setState({top3:{}});}
  }


  check(top3, winners,color){
    if(!top3 && this.state.top3 !== ""){return this.setState({top3: "", winners: {},color: {} });}
    if(this.props.currentUser.email === 'admin@veriests.com' && this.state.admin ){
      this.props.insertWinners({top3,winners,color,'email': this.props.user['email']});
      return this.setState({admin: false, submited: "betting has been submitted"});
    }
    const teams = _.filter(top3, (team) => {
      if(team !== "?"){ if((color[4][64][team] && color[4][64][team]  !== "") || (color[4][63][team] && color[4][63][team] !== "")){return(true);}}
    });
    if (Object.keys(teams).length === 3){
      return this.setState({top3, winners,color});}
    if(Object.keys(this.state.top3).length === 3){this.setState({top3: {}});}
  }

  handleSubmit(){
    if(this.props.currentUser.email ==='admin@veriests.com' )
      {return this.setState({admin: true})}
    const {top3, winners,color } = this.state;
    if(top3 && Object.keys(top3).length === 3) {
      console.log(top3);
      this.props.insertWinners({top3,winners,color,'email': this.props.user['email']});
      this.setState({submited: "betting has been submitted"});
    }
    else{this.setState({submited: "plase make sure you have completed your betting" });}
  }

  render(){
    console.log(this.props.user.email);
    console.log(this.props.match.params.email);
    if(this.props.user.email !== this.props.match.params.email){ return(<div />);}
    return(
      <div>
        <header>
          <Nav email={this.props.currentUser.email ? this.props.currentUser.email : "" }  />
        </header>
        <Groups update={this.state.update} clear={this.state.clear}  />
        <Matches update={this.state.update} check={this.check} admin={this.state.admin} clear={this.state.clear} />
        {this.state.update &&  (
          <div>
            <button onClick={() => this.handleSubmit() }>
              submit betting
            </button>
            <button onClick={() => this.setState({clear: "all"})}>
              clear all
            </button>
            <button onClick={() => this.setState({clear:"match"})}>
              clear playoff
            </button>
          </div>
          )}
      <div>{this.state.submited && this.state.submited }</div>
      <div>{this.props.user.email === 'admin@veriests.com' && (<button onClick= {() => this.props.insertEnd(!this.props.end ? {'end':true} : {'end':false})}>Stop predictions</button>)}</div>
      </div>
    );
  }
}


function mapStateToProps(state){
return {
  user: state.user,
  currentUser: state.currentUser,
  end: state.end.end
};
}

function mapDispatchToProps(dispatch){
return bindActionCreators({fetchUser, insertWinners, fetchEnd, insertEnd}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
