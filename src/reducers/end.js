import { END } from '../actions/index';

export default function(state={}, action){
  switch(action.type)
  {
    case END:
    return {...state,
      'end': action.payload.data.end
    };
    default:
    return state;
  }
}
