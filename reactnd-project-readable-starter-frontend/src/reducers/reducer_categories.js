import {FETCH_CATEGORIES} from './../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      // 經過 redux-promise middleware 處理，可以直接取得資料
      // console.log(action.payload.data) // [post1, post2]

      // 我們要轉化為 { 4: post }

      // const tt = action.payload.then((myBooks) => {
      //   return myBooks
      // })
      return action.payload
    default:
      console.log('## action.type', action.type)
      return state
  }
}