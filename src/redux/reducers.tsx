import * as actionTypes from './actionTypes';
import { combineReducers } from "redux";
import * as Types from '../types/types';

const usersList = (state: Types.User[] = [{
  id: undefined,
  first_name: '',
  last_name: '',
  birth_date: '',
  gender: '',
  job: '',
  biography: '',
  is_active: false
}], action: Types.ActionPayload<typeof actionTypes.UPDATE_USERS_LIST, Types.User[]>)  => {
  switch(action.type) {
    case actionTypes.UPDATE_USERS_LIST:
      return [ ...action.payload ];
    default: return state;
  }
}

const singleUser = (state: Types.User = {
  id: undefined,
  first_name: '',
  last_name: '',
  birth_date: '',
  gender: '',
  job: '',
  biography: '',
  is_active: false
}, action: Types.ActionPayload<typeof actionTypes.UPDATE_SINGLE_USER, Types.User>)  => {
  switch(action.type) {
    case actionTypes.UPDATE_SINGLE_USER:
      return { ...action.payload};
    default: return state;
  }
}

interface AppState {
  usersList: Types.User[];
  singleUser: Types.User
}

const rootReducer = combineReducers<AppState>({
  usersList,
  singleUser
});

export default rootReducer;