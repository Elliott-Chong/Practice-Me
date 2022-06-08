import React from "react";
import ContentContainer from "../components/ContentContainer";
import CodeSnippet from "../components/CodeSnippet";
import { useQuestionsContext } from "../questionsContext";
import { useHistory } from "react-router-dom";

function PracticePage() {
  const { state, fetchQuestion } = useQuestionsContext();
  const inputRef = React.useRef();
  const history = useHistory();

  React.useEffect(() => {
    if (!state.practice.started) {
      history.push("/practice-config");
    } else {
      fetchQuestion();
    }
  }, [history, state.practice.started, fetchQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      answer.toString().toLowerCase() ===
      state.practice.answer.toString().toLowerCase()
    ) {
      setStat((stat) => {
        return { all: stat.all + 1, correct: stat.correct + 1 };
      });
      setCorrect(true);
    } else {
      setStat({ ...stat, all: stat.all + 1 });
      setCorrect(false);
    }
    setAnswer("");
    inputRef.current.focus();
    setTimeout(() => {
      setCorrect("neutral");
    }, 1000);
    fetchQuestion();
  };

  const [stat, setStat] = React.useState({
    all: 0,
    correct: 0,
  });

  const [answer, setAnswer] = React.useState("");
  const [correct, setCorrect] = React.useState("neutral");

  return (
    <ContentContainer className="flex justify-center items-center flex-col">
      <h1 className="text-white text-3xl font-karla font-bold">
        {stat.correct}/{stat.all}
        <span className="ml-4 text-2xl font-normal font-mono text-yellow-300">
          ({stat.all !== 0 ? ((stat.correct / stat.all) * 100).toFixed(2) : 0}%)
        </span>
      </h1>
      <div className="w-[85vw] max-w-[500px]">
        <CodeSnippet correct={correct} question={state.practice.question} />
        <form
          onSubmit={handleSubmit}
          className="flex mt-4 font-space md:items-center items-end justify-center flex-col md:flex-row gap-3"
        >
          <div className="flex gap-3 justify-center items-center">
            <input
              ref={inputRef}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              type="text"
              className="py-1 px-2 text-white bg-gray-900 border-2"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              autoFocus={true}
              name="answer"
              placeholder="output"
              id="answer"
            />
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-800 transition-all py-1 px-2"
            >
              next()
            </button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("cim");
            }}
            className="text-white bg-sp-red hover:opacity-70 transition-all py-1 px-2"
          >
            end session
          </button>
        </form>
      </div>
    </ContentContainer>
  );
}

export default PracticePage;
