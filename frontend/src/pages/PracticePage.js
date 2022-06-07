import React from "react";
import axios from "axios";
import ContentContainer from "../components/ContentContainer";
import CodeSnippet from "../components/CodeSnippet";

function TopicBox({ topic }) {
  return (
    <div className="topic-box text-center m-2">
      <input type="checkbox" id={topic} name="topics" />
      <label htmlFor={topic} className="text-white p-2 rounded-sm ">
        {topic}
      </label>
    </div>
  );
}

function PracticePage() {
  const [question, setQuestion] = React.useState({
    question: null,
    answer: null,
  });

  const [formData, setFormData] = React.useState({
    difficulty: "",
    topics: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [started, setStarted] = React.useState(false);
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
    setQuestion({
      question: response.data.question,
      answer: response.data.answer,
    });
  };
  React.useEffect(() => {
    fetchQuestion();
  }, []);

  if (!started) {
    return (
      <ContentContainer className="flex justify-center items-center flex-col">
        <div className="flex shadow-xl flex-col md:w-[40vw] w-[80vw]">
          <div className="bg-gray-900 py-2 px-4 font-space font-bold text-white w-full">
            <h1 className="text-3xl">constructor()</h1>
          </div>

          <form
            className="flex flex-col p-5 md:text-lg bg-gray-700 gap-5"
            onSubmit={handleSubmit}
          >
            <div className="form-control font-mono flex flex-col">
              <label className="text-white" htmlFor="difficulty">
                this.difficulty =
              </label>
              <select
                name="difficulty"
                className="py-1 px-2 shadow-lg"
                onChange={handleChange}
                required
                id="difficulty"
                value={formData.difficulty}
              >
                <option value="easy">Easy</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div
              id="topics-container"
              className="font-mono grid grid-cols-2 md:grid-cols-3 items-center justify-start"
            >
              <TopicBox topic="scope" />
              <TopicBox topic="arrays" />
              <TopicBox topic="boolean" />
              <TopicBox topic="do-while" />
              <TopicBox topic="if-else" />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 font-space transition-all text-white self-start shadow-lg py-1 px-2"
            >
              this.begin()
            </button>
          </form>
        </div>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer className="flex justify-center items-center flex-col">
      <CodeSnippet question={question.question} />
    </ContentContainer>
  );
}

export default PracticePage;
