const initialState = {
  userInfo: {},
  status: 'loading',
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHORIZATION': {
      return {
        ...state,
        userInfo: action.payload,
        status: 'loaded',
      };
    }
    default:
      return state;
  }
};
export const selectIsAuth = (state) => Boolean(state.userInfo);
