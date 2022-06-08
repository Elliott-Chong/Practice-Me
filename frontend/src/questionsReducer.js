const initialState = {
  practice: {
    started: false,
    difficulty: null,
    topics: null,
    question: null,
    answer: null,
    stats: {
      correct: 0,
      all: 0,
    },
  },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "update_practice_preference":
      return { ...state, practice: { ...state.practice, ...payload } };
    case "update_practice_start_status":
      return { ...state, practice: { ...state.practice, started: payload } };
    case "reset_practice_config":
      return {
        ...state,
        practice: initialState.practice,
      };
    case "set_practice_question":
      return {
        ...state,
        practice: {
          ...state.practice,
          question: payload.question,
          answer: payload.answer,
        },
      };
    case "update_practice_stats":

    default:
      return state;
  }
};

export { initialState, reducer };
