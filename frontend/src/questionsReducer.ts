type stateType = {
  single: {
    started: Boolean,
    ended: Boolean,
    currentTopic: String,
    question: any,
    difficulty: String,
    topics: [],
    answer: null,
    stats: any,
    ranked: false,
  },
  multi: {
    started: Boolean,
    ended: Boolean,
    ranked: Boolean,
    topics: [],
    difficulty: String,
    me: {
      currentTopic: String,
      question: any,
      answer: any,
      stats: any,
    },
    them: {
      currentTopic: any,
      question: any,
      answer: any,
      stats: any,
    },
  },
}


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
  multi: {
    started: false,
    ended: false,
    ranked: false,
    topics: [],
    difficulty: "easy",
    me: {
      currentTopic: null,
      question: null,
      answer: null,
      stats: {},
    },
    them: {
      currentTopic: null,
      question: null,
      answer: null,
      stats: {},
    },
  },
};

const reducer = (state:stateType, action:any) => {
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
      state.single.ranked = payload;
      return;

    // multi player
    case "update_multi_preference":
      return {...state, multi: {...state.multi, ...payload}}
    case "update_multi_start_status":
      state.multi.started = payload
      break
    case "update_multi_end_status":
      state.multi.ended = payload
      break
    case "reset_multi_config":
      return {...state, multi: initialState.multi}
    case 'update_multi_ranked':
      state.multi.ranked = payload
      break
    

    default:
      return state;
  }
};

export { initialState, reducer };
