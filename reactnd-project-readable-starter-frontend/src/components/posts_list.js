import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash'

import { fetchCategories, fetchPosts } from './../actions';
import ListView from './list_view'

class PostsList extends Component {
  componentDidMount() {
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

  render() {
    const { posts } = this.props;

    return (
      <div>
        <h1 className="project-title">Readable</h1>
        <h2 className="category-title">Categories</h2>
        <div className="row">{this.renderCategory()}</div>
        <h2 className="category-title">All Posts</h2>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add A Post
          </Link>
        </div>
        <h5>Posts sorting by: <a href="#">Date</a><a className="a-margin" href="#">Score</a></h5>
        <ListView posts={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories, posts: state.posts };
}

// 第一個參數 state
// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex)
export default connect(mapStateToProps, { fetchCategories, fetchPosts })(
  PostsList
);
