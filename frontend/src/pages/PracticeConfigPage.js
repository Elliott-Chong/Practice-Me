import React from "react";
import ContentContainer from "../components/ContentContainer";
import { useHistory } from "react-router-dom";
import { useQuestionsContext } from "../questionsContext";

function TopicBox({ topic, handleChange }) {
  return (
    <div className="topic-box grid items-stretch shadow-lg text-center">
      <input
        type="checkbox"
        id={topic}
        value={topic}
        onChange={handleChange}
        name="topics"
      />
      <label
        htmlFor={topic}
        className="text-white font-space p-1 border-2 rounded-sm cursor-pointer"
      >
        {topic}
      </label>
    </div>
  );
}

function PracticeConfigPage() {
  const history = useHistory();
  const { dispatch } = useQuestionsContext();
  const [formData, setFormData] = React.useState({
    difficulty: "",
    topics: [],
  });
  React.useEffect(() => {
    dispatch({
      type: "update_start_status",
      payload: false,
    });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "update_practice_preference",
      payload: { difficulty: formData.difficulty, topics: formData.topics },
    });
    dispatch({
      type: "update_start_status",
      payload: true,
    });
    history.push("/practice");
  };

  const handleChange = (e) => {
    const count = (arr, elt) => {
      let num = 0;
      for (let i of arr) {
        if (i === elt) num++;
      }
      return num;
    };
    if (e.target.name === "topics") {
      if (count(formData.topics, e.target.value) > 0) {
        setFormData({
          ...formData,
          [e.target.name]: formData.topics.filter(
            (topic) => topic !== e.target.value
          ),
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: [...formData.topics, e.target.value],
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <ContentContainer className="flex justify-center items-center flex-col">
      <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
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
          <div>
            <p className="text-white font-space inline-block mb-2">
              this.topics = [
            </p>
            <div
              id="topics-container"
              className="font-mono grid grid-cols-2 md:grid-cols-3 gap-2 items-center justify-start"
            >
              <TopicBox handleChange={handleChange} topic="scope" />
              <TopicBox handleChange={handleChange} topic="arrays" />
              <TopicBox handleChange={handleChange} topic="boolean" />
              <TopicBox handleChange={handleChange} topic="do-while" />
              <TopicBox handleChange={handleChange} topic="if-else" />
              <TopicBox handleChange={handleChange} topic="incre-decre" />
              <TopicBox handleChange={handleChange} topic="for-loop" />
              <TopicBox handleChange={handleChange} topic="while-loop" />
              <TopicBox handleChange={handleChange} topic="switch" />
              <TopicBox handleChange={handleChange} topic="shorthand" />
            </div>
            <span className="text-white mt-2 inline-block font-space">];</span>
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

export default PracticeConfigPage;
