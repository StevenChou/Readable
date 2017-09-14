import _ from 'lodash';

import {
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST,
  VOTE,
  ORDER_BY,
  FETCH_COMMENTS_MA
} from './../actions';

// receive previous state
// 設定 state 初始值
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      _.forEach(action.payload.data, function(obj) {
        obj['commNum'] = 0;
      });

      return _.mapKeys(
        _.orderBy(action.payload.data, ['voteScore'], ['desc']),
        'id'
      );
    case FETCH_POST:
      // ES5
      // const post = action.payload.data
      // const newState = { ...state }
      // newState[post.id] = post
      // return newState

      // ES6
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
      // if the state object has a key of the posts id just drop it
      return _.omit(state, action.payload);
    case VOTE:
      console.log('$$ reducer posts');
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
    case ORDER_BY:
      const newState2 = { ...state };
      return _.mapKeys(_.orderBy(newState2, [action.payload], ['desc']), 'id');
    case FETCH_COMMENTS_MA:
      if (action.payload.length !== 0) {
        console.log('????!!!! comment num', action.payload[0]['parentId']);
        const postId = action.payload[0]['parentId'];
        const newState3 = { ...state };
        newState3[postId]['commNum'] = action.payload.length;
        console.log('*** new state', newState3);
        return newState3;
      }
      return state;
    default:
      console.log('##[posts] action.type', action.type);
      return state;
  }
}
