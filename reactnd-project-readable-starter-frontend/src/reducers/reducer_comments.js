import _ from 'lodash';

import { FETCH_COMMENTS, COMMENT_VOTE, DELETE_COMMENT } from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      // 經過 redux-promise middleware 處理，可以直接取得資料
      console.log('$$ fetch_commentws', action.payload.data); // [post1, post2]
      // 我們要轉化為 { 4: post }
      return _.mapKeys(action.payload.data, 'id');
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    case COMMENT_VOTE:
      console.log('$$ reducer comments')
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
      console.log('##[posts] action.type', action.type);
      return state;
  }
}