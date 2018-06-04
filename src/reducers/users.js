import { FETCH_USERS } from '../actions/index';


export default function(state = {}, action) {
  switch(action.type){
    case FETCH_USERS:
      return {...state,
        'users': action.payload.data
      }
      default:
      return state;
  }
}
