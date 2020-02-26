import {promiseTypeSuffixes} from '../constants';

const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes;

const initialState = {
  items: [],
  loaded: false,
  loading: false,
  error: null,
  page: 1,
  selectedPost: {},
  selectedPrevPost: {},
  selectedNextPost: {},
};

function posts(state = initialState, action) {
  const {type, payload, meta} = action;
  switch (type) {
    case `GET_POSTS_${PENDING}`:
      return {
        ...state,
        loading: true,
      };
    case `GET_POSTS_${FULFILLED}`:
      return {
        ...state,
        items: payload.data,
        loading: false,
        page: meta.page,
      };
    case `GET_POSTS_${REJECTED}`:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case `DELETE_POST_${FULFILLED}`:
      return {
        ...state,
        items: state.items.filter(item => item.id !== meta.id),
      };
    case `UPDATE_POST_${FULFILLED}`:
      const {data: post} = payload;
      return {
        ...state,
        items: state.items.map(item => (item.id === post.id ? post : item)),
      };
    case `SET_SELECTED_POST`: {
      const selectedPost = state.items.find(item => item.id === meta.id) || {};
      const selectedPostIndex = state.items.findIndex(
        item => item.id === selectedPost.id,
      );
      return {
        ...state,
        selectedPost,
        selectedPrevPost: state.items[selectedPostIndex - 1] || {},
        selectedNextPost: state.items[selectedPostIndex + 1] || {},
      };
    }
    case `SET_SELECTED_PREV`: {
      const selectedPostIndex = state.items.findIndex(
        item => item.id === state.selectedPost.id,
      );
      return {
        ...state,
        selectedPost: state.selectedPrevPost,
        selectedPrevPost: state.items[selectedPostIndex - 2] || {},
        selectedNextPost: state.items[selectedPostIndex] || {},
      };
    }
    case `SET_SELECTED_NEXT`: {
      const selectedPostIndex = state.items.findIndex(
        item => item.id === state.selectedPost.id,
      );
      return {
        ...state,
        selectedPost: state.selectedNextPost,
        selectedPrevPost: state.items[selectedPostIndex] || {},
        selectedNextPost: state.items[selectedPostIndex + 2] || {},
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export default posts;
