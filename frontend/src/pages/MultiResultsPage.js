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

function MultiResultsPage() {
  const { state } = useQuestionsContext();
  const { stats, other_stat, other_name } = state.multi;
  const history = useHistory();
  let win_stat = React.useMemo(() => {
    let other_correct = Object.entries(other_stat).reduce(
      (ps, a) => (ps += a[1].correct),
      0
    );
    let you_correct = Object.entries(stats).reduce(
      (ps, a) => (ps += a[1].correct),
      0
    );
    let you_win = you_correct > other_correct;
    let tie = you_correct === other_correct;

    return { other_correct, you_correct, you_win, tie };
  }, [stats, other_stat]);
  React.useEffect(() => {
    if (!state.multi.ended) {
      history.push("/multi-config");
    }
  }, [history, state.multi.ended]);
  return (
    <ContentContainer className="flex justify-center gap-8 items-center flex-col">
      <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
        <div
          className={`${
            win_stat.you_win || win_stat.tie ? "bg-green-500" : "bg-red-500"
          } py-2 px-4 font-space font-bold text-white w-full`}
        >
          <h1 className="text-3xl">
            You {win_stat.tie ? "Tied!" : win_stat.you_win ? "Won!" : "Lost!"}
          </h1>
          <h1 className="text-2xl inline">
            Total correct: {win_stat.you_correct}
          </h1>
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

      <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
        <div
          className={`${
            !win_stat.you_win || win_stat.tie ? "bg-green-500" : "bg-red-500"
          } py-2 px-4 font-space font-bold text-white w-full`}
        >
          <h1 className="text-3xl">
            {other_name}{" "}
            {win_stat.tie ? "Tied!" : !win_stat.you_win ? "Won!" : "Lost!"}
          </h1>
          <h1 className="text-2xl inline">
            Total correct: {win_stat.other_correct}
          </h1>
        </div>
        <div className="p-5 text-white flex flex-col gap-5 font-space">
          {Object.keys(stats).length === 0 ? (
            <h1 className="text-2xl">Nothing here to see...</h1>
          ) : (
            Object.entries(other_stat).map((stat) => {
              return <StatBlock key={stat[0]} stat={stat} />;
            })
          )}
        </div>
      </div>
    </ContentContainer>
  );
}

export default MultiResultsPage;
