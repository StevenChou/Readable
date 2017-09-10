import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategories } from './../actions';

class PostsList extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderCategory() {
    const { categories } = this.props;

    if (categories !== 'undefined') {
      return categories.map(cate => (
        <div className="col-sm-4" key={cate.path}>
          <Link to={`/${cate.path}`} className="category-margin">{cate.name}</Link>
        </div>
      ));
    }
  }

  render() {
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
        <h3>Posts</h3>
        <p>123</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

// 第一個參數 state
// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex)
export default connect(mapStateToProps, { fetchCategories })(PostsList);
