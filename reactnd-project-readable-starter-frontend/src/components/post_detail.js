import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost, vote, fetchComments } from './../actions';

class PostDetail extends Component {
  componentDidMount() {
    const { category, post_id } = this.props.match.params;
    // console.log('trace 11')
    // 如果不存在，才發出請求
    if (!this.props.post) {
      // console.log('trace 22')
      this.props.fetchPost(post_id);
    }

    this.props.fetchComments(post_id);
  }

  onDeleteClick() {
    const { post_id } = this.props.match.params;
    this.props.deletePost(post_id, () => {
      this.props.history.push('/');
    });

    // bad code[when the post is still being fetched from backend this component will render]
    // this.props.deletePost(this.props.post.id)
  }

  onVote(postId, option) {
    // console.log('********trace vote', postId, option);
    this.props.vote(postId, option, () => {
      //this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    // console.log('@@ check post', post);
    // *** 當 component 第一次 render 時，post is undefined!!
    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1 className="project-title">Readable[Detail]</h1>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right a-margin"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete
        </button>
        <button className="btn btn-primary pull-xs-right">Edit</button>
        <br/><br/>
        <h3>Title: {post.title}</h3>
        <h6>Body: {post.body}</h6>
        <h6>Author: {post.author}</h6>
        <h6>Comments: {}</h6>
        <h6>Score: {post.voteScore}</h6>
        <h6>
        Vote:<button
          className="btn-link"
          onClick={event => this.onVote(post.id, 'upVote')}
        >
          Up
        </button>
        <button
          className="btn-link a-margin"
          onClick={event => this.onVote(post.id, 'downVote')}
        >
          Down
        </button>
        </h6>
        <hr/>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  // console.log('[trace1] ownProps.match.params.id=', ownProps.match.params.post_id)
  // console.log('[trace3] posts[ownProps.match.params.id]=', posts[ownProps.match.params.post_id])
  // console.log('[trace4] posts', posts)
  // *** 故意加 posts，因為 post 變化不會自動觸發 ***
  return { post: posts[ownProps.match.params.post_id], posts };
}

export default connect(mapStateToProps, { fetchPost, deletePost, vote, fetchComments })(
  PostDetail
);
