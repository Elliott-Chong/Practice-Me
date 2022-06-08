import { initialState, reducer } from "./questionsReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const QuestionsContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);
  const fetchQuestion = React.useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      difficulty: state.practice.difficulty,

      topic:
        state.practice?.topics[
          Math.floor(Math.random() * state.practice.topics?.length)
        ],
    });
    try {
      const response = await axios.post(`/api/questions/`, body, config);
      dispatch({ type: "set_practice_question", payload: response.data });
    } catch (error) {
      console.error(error.message);
    }
  }, [state.practice.difficulty, state.practice.topics]);

  return (
    <QuestionsContext.Provider
      value={{
        state,
        dispatch,
        fetchQuestion,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

const useQuestionsContext = () => {
  return useContext(QuestionsContext);
};

export default Context;
export { useQuestionsContext };
