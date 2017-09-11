import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import CategoriesReducer from './reducer_categories';
import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  posts: PostsReducer,
  form: FormReducer
});

export default rootReducer;
