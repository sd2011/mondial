import { FETCH_USER, INSERT_GROUPS_WINNERS } from '../actions/index';


export default function(state = {}, action) {
  switch(action.type){
    case FETCH_USER:
      return {
        ...state,
        "email": action.payload.email,
        "id": action.payload.id,
        "office": action.payload.office,
        "groupsWinners": action.payload.groupsWinners
    };
    case INSERT_GROUPS_WINNERS:
      return{
        ...state,
        "groupsWinners": action.payload
      };
    default:
    return state;
      }
}
