import _ from 'lodash';

import { FETCH_CATEGORY_POSTS, DELETE_POST, CATE_VOTE, CATE_ORDER_BY } from './../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(_.orderBy(action.payload.data, ['voteScore'], ['desc']), 'id');
    case DELETE_POST:
      return _.omit(state, action.payload);
    case CATE_VOTE:
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
    case CATE_ORDER_BY:
      const newState2 = { ...state }
      return _.mapKeys(_.orderBy(newState2, [action.payload], ['desc']), 'id');
    default:
      console.log('##[categoryPosts] action.type', action.type);
      return state;
  }
}
