const initialState = {
  practice: {
    started: false,
    difficulty: null,
    topics: null,
  },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "update_practice_preference":
      return { ...state, practice: { ...state.practice, ...payload } };
    case "update_start_status":
      return { ...state, practice: { ...state.practice, started: payload } };
    default:
      return state;
  }
};

export { initialState, reducer };
