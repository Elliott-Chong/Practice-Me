const initialState = {
  alerts: [],
  user: null,
  loading: false,
  nav_height: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_NAV_HEIGHT":
      return { ...state, nav_height: payload };

    default:
      return state;
  }
};

export { initialState, reducer };
