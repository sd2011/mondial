<<<<<<< HEAD
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
=======
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
>>>>>>> b79665d0f9f017614cd7c8f785c1ff2874a74278
