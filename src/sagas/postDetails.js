/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';
import axios from 'axios';

import { ActionTypes } from 'constants/index';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */

 /**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getPostDetails({ payload }) {
    try {
      const postDetail = yield call(
        axios,
        `https://jsonplaceholder.typicode.com/posts/${payload.id}`,
      );

      const postComments = yield call(
        axios,
        `https://jsonplaceholder.typicode.com/comments?postId=${payload.id}`,
      );

      const postAuthor = yield call(
        axios,
        `https://jsonplaceholder.typicode.com/users/${postDetail.data.userId}`,
      ); 

      const response = {
        details: postDetail.data,
        comments: postComments.data,
        user: postAuthor.data
      };
      console.log(response);
      yield put({
        type: ActionTypes.GET_POST_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (err) {
      /* istanbul ignore next */
      yield put({
        type: ActionTypes.GET_POST_DETAILS_FAILURE,
        payload: err,
      });
    }
  }
  
  /**
   * GitHub Sagas
   */
  export default function* root() {
    yield all([takeLatest(ActionTypes.GET_POST_DETAILS, getPostDetails)]);
  }
  