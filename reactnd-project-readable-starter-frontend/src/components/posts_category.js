import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsCategory extends Component {
  render() {
    const { category } = this.props.match.params

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <p>{category}</p>
      </div>
    )
  }
}

export default PostsCategory;
