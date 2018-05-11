import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import users from './users';
import currentUser from './currentUser';


const rootReducers = combineReducers({
  user,
  users,
  currentUser,
  form: formReducer
});

export default rootReducers;
