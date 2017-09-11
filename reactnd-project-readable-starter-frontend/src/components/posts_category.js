import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategoryPosts, deletePost, vote } from './../actions';
import ListView from './list_view';

class PostsCategory extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchCategoryPosts(category);
  }

  deleteClick(postId) {
    // console.log('trace postId', postId);
    this.props.deletePost(postId, () => {
      this.props.history.push('/');
    });
  }

  vote(postId, option) {
    console.log("trace vote", postId, option)
    this.props.vote(postId, option, () => {
      // this.props.history.push('/');
    });
  }

  render() {
    const { category } = this.props.match.params
    const { categoryPosts } = this.props;
    const backURL = `/posts/new/${category}`;

    return (
      <div>
        <h1 className="project-title">Readable</h1>
        <Link to="/">Back To Index</Link>
        <h2 className="category-title">Category [{category}] Posts</h2>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to={backURL}>
            Add A Post
          </Link>
        </div>
        <h5>
          Posts sorting by: <button className="btn-link">Date</button>
          <button className="btn-link a-margin">
            Score
          </button>
        </h5>
        <ListView posts={categoryPosts}
         onDeleteClick={this.deleteClick.bind(this)}
         onVote={this.vote.bind(this)}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { categoryPosts: state.categoryPosts };
}

export default connect(mapStateToProps, {
  fetchCategoryPosts,
  deletePost,
  vote
})(PostsCategory);