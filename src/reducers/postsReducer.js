import {
  SAVE_POST_FAILURE,
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  SAVE_YEAR_FAILURE,
  SAVE_YEAR_START,
  SAVE_YEAR_SUCCESS,
  GET_YEARS_FAILURE,
  GET_YEARS_START,
  GET_YEARS_SUCCESS
} from "../actions/index";

const initialState = {
  posts: [],
  savingPost: false,
  postError: "",
  gettingPosts: false,
  savingYear: false,
  gettingYears: false,
  postYears: [],
  yearError: ""
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST_START:
      return {
        ...state,
        savingPost: true
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savingPost: false,
        postError: "",
        posts: [...action.payload]
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        savingPost: false
      };
    case GET_POSTS_START:
      return {
        ...state,
        gettingPosts: true
      };
    case GET_POSTS_SUCCESS:
      if (action.payload === null) {
        return {
          ...state,
          gettingPosts: false,
          postError: "",
          posts: []
        };
      } else {
        return {
          ...state,
          gettingPosts: false,
          postError: "",
          posts: [...action.payload]
        };
      }
    case GET_POSTS_FAILURE:
      return {
        ...state,
        postError: action.payload,
        savingPost: false
      };
    case SAVE_YEAR_START:
      return {
        ...state,
        savingYear: true
      };
    case SAVE_YEAR_SUCCESS:
      return {
        ...state,
        savingYear: false,
        yearError: "",
        posts: [...action.payload]
      };
    case SAVE_YEAR_FAILURE:
      return {
        ...state,
        yearError: action.payload,
        savingYear: false
      };
    case GET_YEARS_START:
      return {
        ...state,
        gettingYears: true
      };
    case GET_YEARS_SUCCESS:
      if (action.payload === null) {
        return {
          ...state,
          gettingYears: false,
          yearError: "",
          postYears: []
        };
      } else {
        return {
          ...state,
          gettingYears: false,
          yearError: "",
          postYears: [...action.payload]
        };
      }
    case GET_YEARS_FAILURE:
      return {
        ...state,
        yearError: action.payload,
        savingPost: false
      };
    default:
      return state;
  }
};
