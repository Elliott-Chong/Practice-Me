const initialState = {
  practice: {
    started: false,
    ended: false,
    currentTopic: null,
    question: null,
    difficulty: "easy",
    topics: [],
    answer: null,
    stats: {},
  },
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "update_practice_preference":
      return { ...state, practice: { ...state.practice, ...payload } };
    case "update_practice_start_status":
      return { ...state, practice: { ...state.practice, started: payload } };
    case "update_practice_end_status":
      return { ...state, practice: { ...state.practice, ended: payload } };
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
          currentTopic: payload.currentTopic,
        },
      };
    case "update_practice_stats":
      // payload: {correct: true, topic: 'if-else'}
      const { correct, topic } = payload;
      const { practice } = state;
      if (practice.stats.hasOwnProperty(topic)) {
        let updatedAll = practice.stats[topic].all + 1;
        let updatedCorrect = correct
          ? practice.stats[topic].correct + 1
          : practice.stats[topic].correct;

        return {
          ...state,
          practice: {
            ...practice,
            stats: {
              ...practice.stats,
              [topic]: { correct: updatedCorrect, all: updatedAll },
            },
          },
        };
      } else {
        let updatedCorrect = correct ? 1 : 0;
        return {
          ...state,
          practice: {
            ...practice,
            stats: {
              ...practice.stats,
              [topic]: { correct: updatedCorrect, all: 1 },
            },
          },
        };
      }

    default:
      return state;
  }
};

export { initialState, reducer };
