import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class ListView extends Component {
  renderPost() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/${post.category}/${post.id}`}>Title:{post.title}</Link>
          <span className="span-margin">|Author:{post.author}</span>
          <span className="span-margin">|Comments:</span>
          <span className="span-margin">|Score:{post.voteScore}</span>
          <span className="span-margin">|Vote:<a href="#">Up</a><a className="a-margin" href="#">Down</a></span>
          <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            EDIT
          </Link>

          <Link className="btn btn-primary a-margin" to="/posts/new">
            DELETE
          </Link>
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className="list-group">{this.renderPost()}</ul>;
  }
}

export default ListView;
