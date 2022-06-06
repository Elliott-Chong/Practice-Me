const initialState = {
  alerts: [],
  user: null,
  loading: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export { initialState, reducer };
