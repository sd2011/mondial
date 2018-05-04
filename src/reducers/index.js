import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';


const rootReducers = combineReducers({
  user: user,
  form: formReducer
});

export default rootReducers;
