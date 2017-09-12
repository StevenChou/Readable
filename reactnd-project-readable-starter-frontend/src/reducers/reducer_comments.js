import _ from 'lodash';

import {
  FETCH_COMMENTS,
  COMMENT_VOTE,
  DELETE_COMMENT,
  ADD_COMMENT
} from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return _.mapKeys(action.payload.data, 'id');
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    case COMMENT_VOTE:
      const newState = { ...state };

      if (action.option === 'upVote') {
        newState[action.payload]['voteScore'] = ++newState[action.payload][
          'voteScore'
        ];
      } else if (action.option === 'downVote') {
        newState[action.payload]['voteScore'] = --newState[action.payload][
          'voteScore'
        ];
      }

      return newState;
    case ADD_COMMENT:
      if (action.payload) {
        return { ...state, [action.payload.id]: action.payload };
      } else {
        return state;
      }
    default:
      return state;
  }
}
