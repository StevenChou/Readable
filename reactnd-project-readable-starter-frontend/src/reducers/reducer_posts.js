import _ from 'lodash';

import { FETCH_POSTS, FETCH_POST, DELETE_POST, VOTE, ORDER_BY } from './../actions';

// receive previous state
// 設定 state 初始值
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // 經過 redux-promise middleware 處理，可以直接取得資料
      console.log('$$ fetch_posts', action.payload.data); // [post1, post2]

      // 我們要轉化為 { 4: post }
      return _.mapKeys(_.orderBy(action.payload.data, ['voteScore'], ['desc']), 'id');
    case FETCH_POST:
      // ES5
      // const post = action.payload.data
      // const newState = { ...state }
      // newState[post.id] = post
      // return newState

      // ES6
      return { ...state, [action.payload.data.id]: action.payload.data}
    case DELETE_POST:
      // if the state object has a key of the posts id just drop it
      return _.omit(state, action.payload);
    case VOTE:
      console.log('$$ reducer posts')
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
    case ORDER_BY:
      const newState2 = { ...state }
      return _.mapKeys(_.orderBy(newState2, [action.payload], ['desc']), 'id');
    default:
      console.log('##[posts] action.type', action.type);
      return state;
  }
}
