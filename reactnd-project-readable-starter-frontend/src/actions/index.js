import axios from 'axios';

import * as TYPE from './type';

const api = 'http://localhost:3001';
const headers = {
  Accept: 'application/json',
  Authorization: '1234'
};

// action creator
export function fetchCategories() {
  const request = fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

  return {
    type: TYPE.FETCH_CATEGORIES,
    payload: request
  };
}

// action creator
export function createPost(values, callback) {
  const request = axios({
    method: 'post',
    url: `${api}/posts`,
    data: values,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.CREATE_POST,
    payload: request
  };
}

export function addComment(values, callback) {
  // const request = axios({
  //   method: 'post',
  //   url: `${api}/comments`,
  //   data: values,
  //   headers: {
  //     ...headers,
  //     'Content-Type': 'application/json'
  //   }
  // }).then(res => res.json());

  const request = fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res => res.json());

  return {
    type: TYPE.ADD_COMMENT,
    payload: request
  };
}

// action creator
export function fetchPosts() {
  const request = axios({
    method: 'get',
    url: `${api}/posts`,
    headers: {
      ...headers
    }
  });
  return {
    type: TYPE.FETCH_POSTS,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios({
    method: 'get',
    url: `${api}/posts/${id}`,
    headers: {
      ...headers
    }
  });

  return {
    type: TYPE.FETCH_POST,
    payload: request
  };
}

// action creator
export function fetchComments(id) {
  const request = axios({
    method: 'get',
    url: `${api}/posts/${id}/comments`,
    headers: {
      ...headers
    }
  });
  return {
    type: TYPE.FETCH_COMMENTS,
    payload: request
  };
}

// action creator
export function fetchCommentsMa(id) {
  // const request = axios({
  //   method: 'get',
  //   url: `${api}/posts/${id}/comments`,
  //   headers: {
  //     ...headers
  //   }
  // });

  const request = fetch(`${api}/posts/${id}/comments`, {
    headers
  }).then(res => {
    return res.json();
  });

  return {
    type: TYPE.FETCH_COMMENTS_MA,
    payload: request
  };
}

// action creator
export function fetchCateCommentsMa(id) {
  // const request = axios({
  //   method: 'get',
  //   url: `${api}/posts/${id}/comments`,
  //   headers: {
  //     ...headers
  //   }
  // });

  const request = fetch(`${api}/posts/${id}/comments`, {
    headers
  }).then(res => {
    return res.json();
  });

  return {
    type: TYPE.FETCH_CATE_COMMENTS_MA,
    payload: request
  };
}

// action creator
export function deletePost(id, callback) {
  axios({
    method: 'delete',
    url: `${api}/posts/${id}`,
    headers: {
      ...headers
    }
  }).then(() => callback());

  return {
    type: TYPE.DELETE_POST,
    payload: id
  };
}

export function deleteComment(id, callback) {
  axios({
    method: 'delete',
    url: `${api}/comments/${id}`,
    headers: {
      ...headers
    }
  }).then(() => callback());

  return {
    type: TYPE.DELETE_COMMENT,
    payload: id
  };
}

export function vote(id, option, callback) {
  axios({
    method: 'post',
    url: `${api}/posts/${id}`,
    data: { option: option },
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.VOTE,
    payload: id,
    option: option
  };
}

export function cateVote(id, option, callback) {
  axios({
    method: 'post',
    url: `${api}/posts/${id}`,
    data: { option: option },
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.CATE_VOTE,
    payload: id,
    option: option
  };
}

export function commentVote(id, option, callback) {
  axios({
    method: 'post',
    url: `${api}/comments/${id}`,
    data: { option: option },
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.COMMENT_VOTE,
    payload: id,
    option: option
  };
}

export function fetchCategoryPosts(category) {
  const request = axios({
    method: 'get',
    url: `${api}/${category}/posts`,
    headers: {
      ...headers
    }
  });

  return {
    type: TYPE.FETCH_CATEGORY_POSTS,
    payload: request
  };
}

export function orderBy(attr) {
  return {
    type: TYPE.ORDER_BY,
    payload: attr
  };
}

export function cateOrderBy(attr) {
  return {
    type: TYPE.CATE_ORDER_BY,
    payload: attr
  };
}

export function commOrderBy(attr) {
  return {
    type: TYPE.COMM_ORDER_BY,
    payload: attr
  };
}

export function editComment(values, commentId, callback) {
  const request = axios({
    method: 'put',
    url: `${api}/comments/${commentId}`,
    data: values,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.EDIT_COMMENT,
    payload: request
  };
}

export function editPost(values, postId, callback) {
  const request = axios({
    method: 'put',
    url: `${api}/posts/${postId}`,
    data: values,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.EDIT_POST,
    payload: request
  };
}
