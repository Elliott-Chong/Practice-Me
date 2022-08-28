const initialState = {
  user: null,
  nav_height: null,
  loading: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_NAV_HEIGHT":
      return { ...state, nav_height: payload };
    case "SET_TOKEN":
      localStorage.setItem("token", payload);
      break;
    case "SET_USER":
      return { ...state, user: payload };
    case "CLEAR_USER":
      localStorage.removeItem("token");
      return { ...state, user: null };
    default:
      return state;
  }
};

export { initialState, reducer };
