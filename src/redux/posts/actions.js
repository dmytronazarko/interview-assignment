export const ITEMS_PER_PAGE = 12;

export const getPosts = page => (dispatch, getState, api) => {
  const query = {
    limit: ITEMS_PER_PAGE,
    offset: ITEMS_PER_PAGE * page - ITEMS_PER_PAGE,
  };
  return dispatch({
    type: 'GET_POSTS',
    payload: api.get('/posts', query),
    meta: {
      page,
    },
  });
};

export const deletePost = id => (dispatch, getState, api) => {
  return dispatch({
    type: 'DELETE_POST',
    payload: api.del(`/posts/${id}`),
    meta: {
      id,
    },
  });
};

export const setSelectedPost = id => (dispatch, getState, api) => {
  return dispatch({
    type: 'SET_SELECTED_POST',
    meta: {
      id,
    },
  });
};

export const setSelectedPrev = () => (dispatch, getState, api) => {
  return dispatch({
    type: 'SET_SELECTED_PREV',
  });
};

export const setSelectedNext = () => (dispatch, getState, api) => {
  return dispatch({
    type: 'SET_SELECTED_NEXT',
  });
};

export const updatePost = post => (dispatch, getState, api) => {
  return dispatch({
    type: 'UPDATE_POST',
    payload: api.put(`/posts/${post.id}`, post),
  });
};
