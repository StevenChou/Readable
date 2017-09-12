import axios from 'axios';

export const FETCH_CATEGORIES = 'fetch_categories';
export const CREATE_POST = 'create_post';
export const FETCH_POSTS = 'fetch_posts';
export const DELETE_POST = 'delete_post';
export const VOTE = 'vote';
export const CATE_VOTE = 'cate_vote'
export const FETCH_CATEGORY_POSTS = 'fetch_category_posts';

const api = 'http://localhost:5001';
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