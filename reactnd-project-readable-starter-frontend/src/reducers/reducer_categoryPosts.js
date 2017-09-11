import _ from 'lodash';

import { FETCH_CATEGORY_POSTS, DELETE_POST, VOTE } from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    case DELETE_POST:
      return _.omit(state, action.payload);
    case VOTE:
      const newState = { ...state };

      if (action.option === 'upVote') {
        newState[action.payload]['voteScore'] = ++newState[
          action.payload
        ]['voteScore'];
      } else if (action.option === 'downVote') {
        newState[action.payload]['voteScore'] = --newState[
          action.payload
        ]['voteScore'];
      }

      return newState;
    default:
      console.log('## action.type', action.type);
      return state;
  }
}