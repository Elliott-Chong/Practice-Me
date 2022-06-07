import { initialState, reducer } from "./questionsReducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <QuestionsContext.Provider
      value={{
        state,
        dispatch,
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
