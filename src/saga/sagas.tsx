import { takeEvery, put, ForkEffect } from 'redux-saga/effects';
import * as requests from '../logic/requests'
import * as actionTypes from '../redux/actionTypes';
import * as Types from '../types/types'

function* requestUsersLists() {
  const payload: Types.User[] = yield requests.getUsersRequest();
  yield put({ type: actionTypes.UPDATE_USERS_LIST, payload: [...payload ]})
}

function* requestSingleUser(action: Types.ActionPayload<typeof actionTypes.REQUEST_SINGLE_USER, Types.User['id']>) {
  const payload: Types.User['id'] = yield requests.getSingleUserRequest(action.payload);
  yield put({ type: actionTypes.UPDATE_SINGLE_USER, payload: payload })
}

function* deleteUser(action: Types.ActionPayload<typeof actionTypes.REQUEST_SINGLE_USER, Types.User['id']>) {
   const payload: Types.User = yield requests.deleteUserRequest(action.payload)
   yield put({ type: actionTypes.REQUEST_USERS_LIST, payload: payload})
  yield put({ type: actionTypes.REQUEST_SINGLE_USER, payload: payload})
}

function* editUser(action: Types.ActionPayload<typeof actionTypes.EDIT_USER, Types.User>) {
  console.log(action.payload)
  yield requests.editUserRequest(action.payload)
  yield put({ type: actionTypes.REQUEST_SINGLE_USER, payload: action.payload.id })
}

function* createUser(action: Types.ActionPayload<typeof actionTypes.CREATE_USER, Types.User>) {
  yield requests.createUserRequest(action.payload)
  yield put({ type: actionTypes.REQUEST_USERS_LIST, })
}

export default function* sagaWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(actionTypes.REQUEST_USERS_LIST, requestUsersLists)
  yield takeEvery(actionTypes.DELETE_USER, deleteUser)
  yield takeEvery(actionTypes.EDIT_USER, editUser)
  yield takeEvery(actionTypes.CREATE_USER, createUser)
  yield takeEvery(actionTypes.REQUEST_SINGLE_USER, requestSingleUser)
}