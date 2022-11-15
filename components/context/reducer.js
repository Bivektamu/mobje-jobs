const reducer = (state, action) => {
  switch (action.type) {
    case "USER_ADDED":
      return {
        ...state,
        loading: false,
        error: 'User created',
        user: action.payload,
      };

      case "USER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

      case "ERROR_HANDLED":
      return {
        ...state,
        loading: false,
        error: ''
      };

    default:
      return state;
  }
};

export default reducer;
