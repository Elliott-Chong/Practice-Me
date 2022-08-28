import React from "react";
import { useHistory } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import { useQuestionsContext } from "../questionsContext";

const StatBlock = ({ stat }) => {
  return (
    <div className="text-2xl">
      <span className="underline">{stat[0]}</span>:{" "}
      <span>{stat[1].correct}</span>/<span>{stat[1].all}</span>{" "}
      <span className="text-sm text-yellow-500">
        ({((stat[1].correct / stat[1].all) * 100).toFixed(2)}%)
      </span>
    </div>
  );
};

function SingleResultsPage() {
  const { state } = useQuestionsContext();
  const { stats } = state.single;
  const history = useHistory();
  React.useEffect(() => {
    if (!state.single.ended) {
      history.push("/single-config");
    }
  }, [history, state.single.ended]);
  return (
    <ContentContainer className="flex justify-center items-center flex-col">
      <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
        <div className="bg-green-500 py-2 px-4 font-space font-bold text-white w-full">
          <h1 className="text-3xl">Overall</h1>
        </div>
        <div className="p-5 text-white flex flex-col gap-5 font-space">
          {Object.keys(stats).length === 0 ? (
            <h1 className="text-2xl">Nothing here to see...</h1>
          ) : (
            Object.entries(stats).map((stat) => {
              return <StatBlock key={stat[0]} stat={stat} />;
            })
          )}
          <button
            onClick={() => history.push("/")}
            className="bg-blue-600 hover:bg-blue-800 font-space transition-all text-white self-start shadow-lg py-1 px-2"
          >
            back
          </button>
        </div>
      </div>
    </ContentContainer>
  );
}

export default SingleResultsPage;
