import React, {Component} from "react"
import _ from "lodash";

class Team extends Component {

  placing(place){
      if(place ===  ""){return("none")}
      else{return(place)}
  }

 render(){
   const {teams, groups, group} = this.props

  const allTeams = _.map(teams,(place,team) => {
  return(
    <div onClick={() => this.changeColor(team,group,groups,place)} key={team} className={"team " + this.placing(place)}>
      <div>{team}</div>
      <div className="place">{place}</div>
    </div>
  );
});
return allTeams;
}

 changeColor(team,group,groups,place){
  const places = ["", "1" , "2", ""];
  for(let i=0; i < places.length; i++){
    if(place === places[i]){
     groups[group][team] = places[i+1];
      return(this.props.setState(groups));
    }
  }
}
}



export default Team;
