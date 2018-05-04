import React, { Component} from 'react';
import { connect } from 'react-redux';
import Matches from "../components/matches/Matches";
import Groups from "../components/Groups/Groups";

class Index extends Component{

  render(){
    return(
      <div>
        <Matches />
        <Groups submit={this.takeProps} />
      </div>
    );
  }
}

function mapStateToProps(state){
return {
  user: state.user
};
}

export default connect(mapStateToProps)(Index);
