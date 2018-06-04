import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import users from './users';
import currentUser from './currentUser';
import end from './end';


const rootReducers = combineReducers({
  user,
  users,
  currentUser,
  end,
  form: formReducer
});

export default rootReducers;
