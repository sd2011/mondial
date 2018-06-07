import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import users from './users';
import currentUser from './currentUser';
import end from './end';
import flags from './flags';


const rootReducers = combineReducers({
  user,
  users,
  currentUser,
  end,
  flags,
  form: formReducer
});

export default rootReducers;
