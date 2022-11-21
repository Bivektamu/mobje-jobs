const reducer = (state, action) => {
  switch (action.type) {
    case "USER_ADDED":
      return {
        ...state,
        loading: false,
        alert: "User created",
        user: action.payload,
      };

    case "LOGGED_IN":
      return {
        ...state,
        loading: false,
        alert: "User Logged In",
        user: action.payload,
    };

    case "USER_ERROR":
      return {
        ...state,
        loading: false,
        alert: action.payload,
      };

    case "ERROR_HANDLED":
      return {
        ...state,
        loading: false,
        alert: "",
      };

    default:
      return state;
  }
};

export default reducer;
