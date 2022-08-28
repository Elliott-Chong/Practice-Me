const initialState = {
  single: {
    started: false,
    ended: false,
    currentTopic: null,
    question: null,
    difficulty: "easy",
    topics: [],
    answer: null,
    stats: {},
    ranked: false,
  },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // single player
    case "update_single_preference":
      return { ...state, single: { ...state.single, ...payload } };
    case "update_single_start_status":
      return { ...state, single: { ...state.single, started: payload } };
    case "update_single_end_status":
      return { ...state, single: { ...state.single, ended: payload } };
    case "reset_single_config":
      return {
        ...state,
        single: initialState.single,
      };
    case "set_single_question":
      return {
        ...state,
        single: {
          ...state.single,
          question: payload.question,
          answer: payload.answer,
          currentTopic: payload.currentTopic,
        },
      };
    case "update_single_stats":
      // payload: {correct: true, topic: 'if-else'}
      const { correct, topic } = payload;
      const { single } = state;
      if (single.stats.hasOwnProperty(topic)) {
        let updatedAll = single.stats[topic].all + 1;
        let updatedCorrect = correct
          ? single.stats[topic].correct + 1
          : single.stats[topic].correct;

        return {
          ...state,
          single: {
            ...single,
            stats: {
              ...single.stats,
              [topic]: { correct: updatedCorrect, all: updatedAll },
            },
          },
        };
      } else {
        let updatedCorrect = correct ? 1 : 0;
        return {
          ...state,
          single: {
            ...single,
            stats: {
              ...single.stats,
              [topic]: { correct: updatedCorrect, all: 1 },
            },
          },
        };
      }
    case "update_single_ranked":
      return { ...state, single: { ...state.single, ranked: payload } };
    default:
      return state;
  }
};

export { initialState, reducer };
