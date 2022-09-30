import { initialState, reducer } from "./questionsReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import produce from "immer";

const QuestionsContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(produce(reducer), initialState);
  useEffect(() => {
    console.log(state.multi);
  }, [state.multi]);
  let currentTopic =
    state?.single?.topics[
      Math.floor(Math.random() * state.single.topics?.length)
    ];

  const fetchQuestion = React.useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      difficulty: state.single.difficulty,

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
        type: "set_single_question",
        payload: { ...response.data, currentTopic },
      });
    } catch (error) {
      console.error(error.message);
    }
  }, [state.single.difficulty, currentTopic]);

  const multiFetchQuestion = React.useCallback(async () => {
    let currentTopic =
      state.multi.topics[Math.floor(Math.random() * state.multi.topics.length)];
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      difficulty: state.multi.difficulty,
      topic: currentTopic,
    });

    try {
      const response = await axios.post("/api/questions/", body, config);
      dispatch({
        type: "set_multi_question",
        payload: { ...response.data, currentTopic },
      });
      // {question: '', answer: ''}
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }, [state.multi.difficulty, state.multi.topics]);

  const updateScore = async (delta_score) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      delta_score,
    });
    try {
      await axios.put(`/api/auth/score`, body, config);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <QuestionsContext.Provider
      value={{
        state,
        dispatch,
        fetchQuestion,
        updateScore,
        multiFetchQuestion,
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
