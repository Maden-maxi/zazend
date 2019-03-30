import { handleActions } from 'redux-actions';
import immutable from 'immutability-helper';
import { parseError } from 'modules/client';

import { ActionTypes, STATUS } from 'constants/index';

export const postDetailState = {
    details: {
        data: {},
        status: STATUS.IDLE,
        message: ''
    }
};

export default {
    postDetails: handleActions(
        {
            [ActionTypes.GET_POST_DETAILS]: (state, {payload}) => {
                return immutable(state, {
                    details: {
                        data: { $set: {} },
                        status: { $set: STATUS.RUNNING }
                    }
                });
            },
            [ActionTypes.GET_POST_DETAILS_SUCCESS]: (state, {payload}) => 
                immutable(state, {
                details: {
                    data: { $set: payload || {} },
                    status: { $set: STATUS.READY },
                }
            }),
            [ActionTypes.GET_POST_DETAILS_FAILURE]: (state, {payload}) => 
                immutable(state, {
                details: {
                    data: { $set: {} },
                    status: { $set: STATUS.ERROR },
                    message: {$set: 'Something went wrong'}
                }
            }),
        },
        postDetailState
    )
}