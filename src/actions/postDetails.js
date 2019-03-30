// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from 'constants/index';

export const { getPostDetails } = createActions({
  [ActionTypes.GET_POST_DETAILS]: (id) => ({ id }),
});
