import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const githubState = {
  posts: {
    data: {},
    status: STATUS.IDLE,
    message: '',
    query: '',
  },
};

export default {
  posts: handleActions(
    {
      [ActionTypes.GET_POSTS]: (state, { payload }) => {
        const data = state.posts.data || [];

        return immutable(state, {
          posts: {
            data: { $set: data },
            message: { $set: '' },
            query: { $set: payload.query },
            status: { $set: STATUS.RUNNING },
          },
        });
      },
      [ActionTypes.GET_POSTS_SUCCESS]: (state, { payload }) =>
        immutable(state, {
          posts: {
            data: { $set: payload.data },
            status: { $set: STATUS.READY },
          },
        }),
      [ActionTypes.GET_POSTS_FAILURE]: (state, { payload }) =>
        immutable(state, {
          posts: {
            message: { $set: parseError(payload.message) },
            status: { $set: STATUS.ERROR },
          },
        }),
    },
    githubState,
  ),
};
