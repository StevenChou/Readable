import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise'

// import './index.css';
// import App from './App';
import reducers from './reducers';
import PostsList from './components/posts_list'
import PostsCategory from './components/posts_category'
import PostsNew from './components/posts_new'
import PostDetail from './components/post_detail'
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route path="/posts/:type/:back" component={PostsNew} />
        <Route path="/:category/:post_id" component={PostDetail} />
        <Route path="/:category" component={PostsCategory} />
        <Route path="/" component={PostsList} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
