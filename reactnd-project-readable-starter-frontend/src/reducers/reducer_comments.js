import _ from 'lodash';

import { FETCH_COMMENTS } from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      // 經過 redux-promise middleware 處理，可以直接取得資料
      console.log('$$ fetch_commentws', action.payload.data); // [post1, post2]
      // 我們要轉化為 { 4: post }
      return _.mapKeys(action.payload.data, 'id');
    default:
      console.log('##[posts] action.type', action.type);
      return state;
  }
}