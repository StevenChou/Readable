import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {
  fetchCategories,
  fetchPosts,
  deletePost,
  vote,
  orderBy,
  fetchCommentsMa
} from './../actions';
import ListView from './list_view';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
  }

  componentDidMount() {
    // router 切回來其實物件還是存在，但會再執行 componentDidMount
    this.flag = false;
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  renderCategory() {
    const { categories } = this.props;

    if (categories !== 'undefined') {
      return categories.map(cate => (
        <div className="col-sm-4" key={cate.path}>
          <Link to={`/${cate.path}`} className="category-margin">
            {cate.name}
          </Link>
        </div>
      ));
    }
  }

  deleteClick(postId) {
    // console.log('trace postId', postId);
    this.props.deletePost(postId, () => {
      this.props.history.push('/');
    });
  }

  vote(postId, option) {
    console.log('trace vote', postId, option);
    this.props.vote(postId, option, () => {
      // this.props.history.push('/');
    });
  }

  orderBy = attr => {
    this.props.orderBy(attr);
  };

  combCommentNum(posts) {
    const postKeys = _.keys(posts);
    _.forEach(postKeys, key => {
      console.log(key);
      // 改 state posts ok?
      this.props.fetchCommentsMa(key);
    });
  }

  render() {
    const { posts } = this.props;

    if (!_.isEmpty(posts) && this.flag === false) {
      this.combCommentNum(posts);
      this.flag = true;
    }

    return (
      <div>
        <h1 className="project-title">Readable</h1>
        <h2 className="category-title">Categories</h2>
        <div className="row">{this.renderCategory()}</div>
        <h2 className="category-title">All Posts</h2>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new/index">
            Add A Post
          </Link>
        </div>
        <h5>
          Posts sorting by:{' '}
          <button
            className="btn btn-link"
            onClick={() => this.orderBy('timestamp')}
          >
            Date
          </button>
          <button
            className="btn btn-link a-margin"
            onClick={() => this.orderBy('voteScore')}
          >
            Score
          </button>
        </h5>
        <ListView
          posts={posts}
          onDeleteClick={this.deleteClick.bind(this)}
          onVote={this.vote.bind(this)}
          back="index"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories, posts: state.posts };
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts,
  deletePost,
  vote,
  orderBy,
  fetchCommentsMa
})(PostsList);
