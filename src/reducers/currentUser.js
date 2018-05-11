import { FETCH_CURRENT_USER } from '../actions/index';


export default function(state = {}, action){
  switch(action.type){
    case FETCH_CURRENT_USER:
    return {...state,
      'email':action.payload.data
    };
    default:
    return state;
  }
}
