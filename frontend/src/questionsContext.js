import { initialState, reducer } from "./questionsReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const QuestionsContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);
  let currentTopic =
    state.practice?.topics[
      Math.floor(Math.random() * state.practice.topics?.length)
    ];
  const fetchQuestion = React.useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      difficulty: state.practice.difficulty,

      topic: currentTopic,
    });
    try {
      const response = await axios.post(`/api/questions/`, body, config);
      // console.log(response.data)
      // response.data = {
      //   question: 'sdkfjlskdf',
      //   answer: '5'
      // }
      dispatch({
        type: "set_practice_question",
        payload: { ...response.data, currentTopic },
      });
    } catch (error) {
      console.error(error.message);
    }
  }, [state.practice.difficulty, currentTopic]);

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
