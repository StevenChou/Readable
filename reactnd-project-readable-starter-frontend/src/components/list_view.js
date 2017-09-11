import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class ListView extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired
  }

  renderPost() {
    const { posts, onDeleteClick } = this.props;
    // console.log('## posts', posts)
    return _.map(posts, post => {
      if (!post.deleted) {
        return (
          <li className="list-group-item" key={post.id}>
            <Link to={`/${post.category}/${post.id}`}>Title:{post.title}</Link>
            <span className="span-margin">|Author:{post.author}</span>
            <span className="span-margin">|Comments:</span>
            <span className="span-margin">|Score:{post.voteScore}</span>
            <span className="span-margin">
              |Vote:<a href="#">Up</a>
              <a className="a-margin" href="#">
                Down
              </a>
            </span>
            <div className="text-xs-right">
              <Link className="btn btn-primary" to="/posts/new">
                EDIT
              </Link>

              <button
                className="btn btn-danger a-margin"
                onClick={event => onDeleteClick(post.id)}
              >
                DELETE
              </button>
            </div>
          </li>
        );
      }
    });
  }

  render() {
    return <ul className="list-group">{this.renderPost()}</ul>;
  }
}

export default ListView;
