import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';

import { _uuid } from '../utils/helpers';

import {
  fetchPost,
  deletePost,
  vote,
  fetchComments,
  commentVote,
  deleteComment,
  addComment,
  commOrderBy
} from './../actions';
import CommentsView from './comments_view';

class PostDetail extends Component {
  componentDidMount() {
    const { post_id } = this.props.match.params;
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

  deleteCommentClick(commentId) {
    console.log('trace commentId', commentId);
    this.props.deleteComment(commentId, () => {
      // this.props.history.push('/');
    });
  }

  voteComment(commentId, option) {
    console.log('trace voteComment', commentId, option);
    this.props.commentVote(commentId, option, () => {
      // this.props.history.push('/');
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { post_id } = this.props.match.params;
    const values = serializeForm(event.target, { hash: true })
    values['parentId'] = post_id
    values['id'] = _uuid();
    values['timestamp'] = Date.now();
    // console.log('values=', values);

    this.bodyInput.value = '';
    this.authorInput.value = '';
    this.props.addComment(values, () => {
    });
  }

  orderBy = attr => {
    this.props.commOrderBy(attr)
  };

  render() {
    const { post, comments } = this.props;

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
        <br />
        <br />
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
        <h5>
          Comments sorting by: <button className="btn btn-link" onClick={() => this.orderBy('timestamp')}>Date</button>
          <button
            className="btn btn-link a-margin"
            onClick={() => this.orderBy('voteScore')}
          >
            Score
          </button>
        </h5>
        <CommentsView
          comments={comments}
          onDeleteClick={this.deleteCommentClick.bind(this)}
          onVote={this.voteComment.bind(this)}
        />
        <hr/>
        <form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <label htmlFor="body">Comment:</label>
            <input type="text" className="form-control a-margin" name="body" id="body" ref={(input) => { this.bodyInput = input; }}/>
          </div>
          <div className="form-group">
            <label htmlFor="author" className="a-margin">Author:</label>
            <input type="text" className="form-control a-margin" name="author" id="author" ref={(input) => { this.authorInput = input; }}/>
          </div>
          <button className="a-margin btn btn-info">Add Comment</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  // console.log('[trace1] ownProps.match.params.id=', ownProps.match.params.post_id)
  // console.log('[trace3] posts[ownProps.match.params.id]=', posts[ownProps.match.params.post_id])
  // console.log('[trace4] posts', posts)
  // *** 故意加 posts，因為 post 變化不會自動觸發 ***
  return { post: posts[ownProps.match.params.post_id], posts, comments };
}

export default connect(mapStateToProps, {
  fetchPost,
  deletePost,
  vote,
  fetchComments,
  commentVote,
  deleteComment,
  addComment,
  commOrderBy
})(PostDetail);
