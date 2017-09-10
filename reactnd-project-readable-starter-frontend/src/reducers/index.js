import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import CategoriesReducer from './reducer_categories';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  form: FormReducer
});

export default rootReducer;
