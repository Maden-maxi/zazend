/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getPosts({ payload }) {
  try {
    const response = yield call(
      axios,
      `https://jsonplaceholder.typicode.com/posts`,
    );
    console.log(response);
    yield put({
      type: ActionTypes.GET_POSTS_SUCCESS,
      payload: response,
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GET_POSTS_FAILURE,
      payload: err,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.GET_POSTS, getPosts)]);
}
