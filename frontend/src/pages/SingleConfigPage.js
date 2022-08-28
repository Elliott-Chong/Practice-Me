import React from "react";
import ContentContainer from "../components/ContentContainer";
import { useHistory } from "react-router-dom";
import { useQuestionsContext } from "../questionsContext";
import { Switch } from "@headlessui/react";
import { useGlobalContext } from "../context";

const all_topics = [
  "array",
  "boolean",
  "scope",
  "incre-decre",
  "do-while",
  "for-loop",
  "while-loop",
  "if-else",
  "switch-case",
  "shorthand",
];

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

function SingleConfigPage() {
  const history = useHistory();
  const { dispatch, state } = useQuestionsContext();
  const { setAlert } = useGlobalContext();
  const [formData, setFormData] = React.useState({
    difficulty: "easy",
    topics: [],
  });
  React.useEffect(() => {
    dispatch({
      type: "update_single_start_status",
      payload: false,
    });
    // dispatch({ type: "reset_single_config" });
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.topics.length === 0) {
      setAlert("error", "Please choose at least one topic");
      return;
    }
    dispatch({
      type: "update_single_preference",
      payload: { difficulty: formData.difficulty, topics: formData.topics },
    });
    dispatch({
      type: "update_single_start_status",
      payload: true,
    });
    history.push("/single-play");
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
    <ContentContainer className="flex justify-center items-center py-10 flex-col">
      <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
        <div className="bg-gray-900 py-2 px-4 font-space flex gap-4 items-center justify-between font-bold text-white w-full">
          <h1 className="text-3xl inline">constructor()</h1>
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
              {all_topics.map((topic) => {
                return (
                  <TopicBox
                    key={topic}
                    handleChange={handleChange}
                    topic={topic}
                  />
                );
              })}
            </div>
            <span className="text-white mt-2 inline-block font-space">];</span>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 font-bold hover:bg-blue-800 font-space transition-all text-white self-start shadow-lg py-1 px-2"
            >
              this.begin()
            </button>

            <Switch.Group>
              <div className="flex items-center gap-2">
                <Switch.Label className="font-space text-white">
                  Ranked
                </Switch.Label>
                <Switch
                  checked={state.single.ranked}
                  onChange={() => {
                    dispatch({
                      type: "update_single_ranked",
                      payload: !state.single.ranked,
                    });
                  }}
                  className={`${
                    state.single.ranked ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none `}
                >
                  <span
                    className={`${
                      state.single.ranked ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </Switch.Group>
          </div>
        </form>
      </div>
    </ContentContainer>
  );
}

export default SingleConfigPage;
