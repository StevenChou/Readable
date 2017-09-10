import axios from 'axios'

export const FETCH_CATEGORIES = 'fetch_categories'
export const CREATE_POST = 'create_post'

const api = "http://localhost:5001"
const headers = {
  'Accept': 'application/json',
  'Authorization': '1234'
}

// action creator
export function fetchCategories() {
  const request = fetch(`${api}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories)

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
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
  }).then(() => callback())

  return {
    type: CREATE_POST,
    payload: request
  }
}
