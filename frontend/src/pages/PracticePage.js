import React from "react";
import ContentContainer from "../components/ContentContainer";
import CodeSnippet from "../components/CodeSnippet";
import { useQuery } from "react-query";
import axios from "axios";
import { useQuestionsContext } from "../questionsContext";
import { useHistory } from "react-router-dom";

function PracticePage() {
  const { state } = useQuestionsContext();
  const codeRef = React.useRef();
  const inputRef = React.useRef();
  const history = useHistory();
  React.useEffect(() => {
    if (!state.practice.started) {
      history.push("/practice-config");
    }
  }, [history, state]);
  const fetchQuestion = async (difficulty, topics) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      difficulty,
      topics,
    });
    const response = await axios.post(
      `/api/questions/functionscope`,
      body,
      config
    );
    return response.data;
  };

  const { data, status, refetch } = useQuery("question", fetchQuestion, {
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    // enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      answer.toString().toLowerCase() === data.answer.toString().toLowerCase()
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
    refetch();
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
        <CodeSnippet
          correct={correct}
          ref={codeRef}
          question={status !== "loading" ? data.question : "loading"}
        />
        <form
          onSubmit={handleSubmit}
          className="flex mt-4 font-space items-center justify-center gap-3"
        >
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
        </form>
      </div>
    </ContentContainer>
  );
}

export default PracticePage;
