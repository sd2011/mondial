import { FETCH_USERS } from '../actions/index';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type){
    case FETCH_USERS:
    console.log(action.payload.data);
      return _.mapKeys(action.payload.data, '_id');
      default:
      return state;
  }
}
