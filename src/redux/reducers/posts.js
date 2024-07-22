import * as actionTypes from "../actionTypes";

const initialState = {
  posts: [],
  postAdded: {},
};

const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
      };

    case actionTypes.ADD_POST:
      return {
        ...state,
        postAdded: payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
