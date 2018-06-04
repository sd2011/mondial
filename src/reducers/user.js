
import { FETCH_USER, INSERT_GROUPS_WINNERS, INSERT_WINNERS } from '../actions/index';


export default function(state = {}, action) {
  switch(action.type){
    case FETCH_USER:
    if(action.payload.data === "lies"){return {...state, 'lies': action.payload.data }}
      return {
        ...state,
        "email": action.payload.data.email,
        "id": action.payload.data._id,
        "office": action.payload.data.office,
        "groupsWinners": action.payload.data.groupsWinners,
        "top3": action.payload.data.top3,
        "winners": action.payload.data.winners,
        "color": action.payload.data.color,
        "score": action.payload.data.score
    };
    case INSERT_GROUPS_WINNERS:
      return{
        ...state,
        'groupsWinners': action.payload.data.groupsWinners,
        "winners": action.payload.data.winners,
        'color': action.payload.data.color
      };
      case INSERT_WINNERS:

      return {...state,
        "top3": action.payload.data.top3,
        "winners": action.payload.data.winners,
        "color": action.payload.data.color,
      };
    default:
    return state;
      }
}
