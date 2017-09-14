import axios from 'axios';

export const FETCH_CATEGORIES = 'fetch_categories';
export const CREATE_POST = 'create_post';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const DELETE_COMMENT = 'delete_comment';
export const VOTE = 'vote';
export const CATE_VOTE = 'cate_vote';
export const COMMENT_VOTE = 'comment_vote';
export const FETCH_CATEGORY_POSTS = 'fetch_category_posts';
export const FETCH_COMMENTS = 'fetch_comments';
export const FETCH_COMMENTS_MA = 'fetch_comments_ma';
export const FETCH_CATE_COMMENTS_MA = 'fetch_cate_comments_ma'
export const ADD_COMMENT = 'add_comment';
export const ORDER_BY = 'order_by';
export const CATE_ORDER_BY = 'cate_order_by';
export const COMM_ORDER_BY = 'comm_order_by';
export const EDIT_COMMENT = 'edit_comment';

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
    type: FETCH_CATEGORIES,
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
    type: CREATE_POST,
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
  }).then(res => res.json())

  return {
    type: ADD_COMMENT,
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
    type: FETCH_POSTS,
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
    type: FETCH_POST,
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
    type: FETCH_COMMENTS,
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

  const request = fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => {
    return res.json()
  })

  return {
    type: FETCH_COMMENTS_MA,
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

  const request = fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => {
    return res.json()
  })

  return {
    type: FETCH_CATE_COMMENTS_MA,
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
    type: DELETE_POST,
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
    type: DELETE_COMMENT,
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
    type: VOTE,
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
    type: CATE_VOTE,
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
    type: COMMENT_VOTE,
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
    type: FETCH_CATEGORY_POSTS,
    payload: request
  };
}

export function orderBy(attr) {
  return {
    type: ORDER_BY,
    payload: attr
  };
}

export function cateOrderBy(attr) {
  return {
    type: CATE_ORDER_BY,
    payload: attr
  };
}

export function commOrderBy(attr) {
  return {
    type: COMM_ORDER_BY,
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
    type: EDIT_COMMENT,
    payload: request
  };
}