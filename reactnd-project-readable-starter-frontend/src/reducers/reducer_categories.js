import { FETCH_CATEGORIES } from './../actions/type';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    default:
      // console.log('## action.type', action.type)
      return state;
  }
}
