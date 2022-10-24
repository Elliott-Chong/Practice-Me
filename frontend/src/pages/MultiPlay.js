import React from "react";
import { useQuestionsContext } from "../questionsContext";
import io from "socket.io-client";
import { useGlobalContext } from "../context";
import ContentContainer from "../components/ContentContainer";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { MagnifyingGlass } from "react-loader-spinner";
import CodeSnippet from "../components/CodeSnippet";
import useTimer from "../components/useTimer";
import produce from "immer";
import { useHistory } from "react-router-dom";

const TIME = 10;

function UserCard({ user, ...props }) {
  return (
    <div
      {...props}
      key={user.id}
      className="w-full bg-gray-700 text-center font-bold text-white font-mono p-4"
    >
      {user.name}
    </div>
  );
}

const MultiPlay = ({ match }) => {
  const history = useHistory();
  const { state, updateScore, dispatch, multiFetchQuestion } =
    useQuestionsContext();
  const { state: globalState, setAlert } = useGlobalContext();
  const id = match.params.id;
  const [clientId, clientIdSet] = React.useState("");
  const [clients, clientsSet] = React.useState([]);

  const [
    time,
    ended,
    minuteTime,
    increaseTime,
    manualSetTime,
    setStartCounting,
  ] = useTimer(TIME);
  const [
    otherTime,
    otherEnded,
    otherMinuteTime,
    otherIncreaseTime,
    otherManualSetTime,
    otherSetStartCounting,
  ] = useTimer(TIME);
  const [answer, setAnswer] = React.useState("");
  const [correct, setCorrect] = React.useState("neutral");
  const [stat, setStat] = React.useState({
    all: 0,
    correct: 0,
  });

  const [other, setOther] = React.useState({
    stats: {},
    time: 0,
    question: "",
    correct: null,
  });

  const [started, setStarted] = React.useState(false);
  const [found, setFound] = React.useState(false);

  const inputRef = React.useRef();
  const answerRef = React.useRef();

  const socketRef = React.useRef();

  React.useEffect(() => {
    if (ended || otherEnded) {
      dispatch({ type: "update_multi_end_status", payload: true });
      history.push("/multi-results");
    }
  }, [ended, otherEnded, dispatch, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      answer.toString().toLowerCase() ===
      state.multi.answer.toString().toLowerCase()
    ) {
      increaseTime(5);
      setStat((stat) => {
        return { all: stat.all + 1, correct: stat.correct + 1 };
      });
      dispatch({
        type: "update_multi_stats",
        payload: { correct: true, topic: state.multi.currentTopic },
      });
      setCorrect(true);
      if (state.multi.ranked) {
        updateScore(1);
      }
    } else {
      setStat({ ...stat, all: stat.all + 1 });
      dispatch({
        type: "update_multi_stats",
        payload: { correct: false, topic: state.multi.currentTopic },
      });
      setCorrect(false);
      if (state.multi.ranked) {
        updateScore(-1);
      }
    }

    wrapperFetch(multiFetchQuestion);
  };

  const wrapperFetch = React.useCallback(
    async (multiFetchQuestion) => {
      const { question } = await multiFetchQuestion();
      let correct;
      if (answer !== "") {
        correct =
          answer.toString().toLowerCase() ===
          state.multi.answer.toString().toLowerCase();
      } else {
        correct = "neutral";
      }
      let new_time = correct === true ? Math.min(TIME, time + 5) : time;

      const topic = state.multi.currentTopic;
      let new_stats = JSON.parse(JSON.stringify(state.multi.stats));
      if (new_stats.hasOwnProperty(topic)) {
        let updated_all = new_stats[topic].all + 1;
        let updated_correct =
          correct === true
            ? new_stats[topic].correct + 1
            : new_stats[topic].correct;
        new_stats[topic].correct = updated_correct;
        new_stats[topic].all = updated_all;
      } else {
        new_stats[topic] = {
          all: correct !== "neutral" ? 1 : 0,
          correct: correct === true ? 1 : 0,
        };
      }

      const payload = {
        room_code: id,
        question,
        time: new_time,
        correct,
        stats: new_stats,
      };
      socketRef.current.emit("play", payload);
      setAnswer("");
      answerRef.current.focus();
      setTimeout(() => {
        setCorrect("neutral");
      }, 1000);
    },
    [time, id, state.multi.answer, answer, state.multi.currentTopic]
  );

  React.useEffect(() => {
    if (other.correct !== "neutral") {
      setTimeout(() => {
        setOther(
          produce(other, (draft) => {
            draft.correct = "neutral";
          })
        );
      }, 1000);
    }
  }, [other]);

  React.useEffect(() => {
    if (!clients || clients.length === 0) return;
    dispatch({
      type: "set_other_name",
      payload: clients.find((c) => c.id !== clientId)?.name,
    });
  }, [clients]);

  React.useEffect(() => {
    if (!state.multi.started) window.location.href = "/multi-config";
  }, [state.multi.started]);

  React.useEffect(() => {
    // const socket = io('http://localhost:5000')
    const socket = io("http://192.168.50.74:5000");
    socketRef.current = socket;

    socket.on("client_id", (payload) => {
      // payload will be socket.id
      clientIdSet(payload);
      socket.emit("join", {
        game_code: id,
        clientId: payload,
        name: globalState.user.name,
      });
    });

    socket.on("update other", (payload) => {
      // {
      //   room_code: 'plnyf',
      //   question: 'sdfsdf',
      //   answer: 'sdfsdf',
      //   time: 991,
      //   correct: 'neutral'
      //   topic: 'if-else'
      //   stats: {...}
      // }

      const { question, time, correct, stats } = payload;
      dispatch({
        type: "set_other_stat",
        payload: stats,
      });
      setOther({
        correct,
        question,
        time,
        stats,
      });

      otherManualSetTime(time);
    });

    socket.on("error", (error) => {
      setAlert("error", error.msg);
      window.location.href = "/multi-join";
    });

    socket.on("join", (payload) => {
      const { topics, difficulty, ranked } = payload;
      dispatch({
        type: "update_multi_preference",
        payload: { topics, difficulty },
      });
      dispatch({ type: "update_multi_ranked", payload: ranked });
      clientsSet(payload.clients);
      if (payload.clients.length === 2) {
        setFound(true);
      } else {
        setFound(false);
      }
    });

    socket.on("start", () => {
      setStarted(true);
    });

    return () => socketRef.current.disconnect();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!started) return;
    wrapperFetch(multiFetchQuestion);
    setStartCounting(true);
    otherSetStartCounting(true);
    // eslint-disable-next-line
  }, [started]);
  return (
    <ContentContainer className="flex justify-center items-center flex-col">
      {!started ? (
        <>
          <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
            <div className="bg-gray-900 py-4 px-4 justify-center font-space flex-col md:flex-row flex gap-4 items-center font-bold text-white w-full">
              <h1 className="text-3xl inline">{id}</h1>

              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  readOnly
                  value={window.location.href}
                  className="text-black font-bold py-1 px-2"
                />

                <button
                  onClick={() => {
                    // copyToClipboard(window.location.href);
                    setAlert("success", "Copied!");
                    inputRef.current.select();
                  }}
                >
                  <ClipboardCopyIcon aria-label="copy" className="h-8 w-8" />
                </button>
              </div>
            </div>
            {!found ? (
              <>
                <div className="bg-gray-900 py-2 px-4 font-space flex gap-4 items-center justify-center font-bold text-white w-full text-2xl">
                  <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                  />
                  <h1 className="inline text-3xl">Waiting...</h1>
                </div>
              </>
            ) : (
              <div className="p-4 flex flex-col gap-4 justify-center items-center">
                <div className="md:flex-row flex flex-col w-full gap-4">
                  {clients?.map((client) => {
                    return <UserCard key={client.id} user={client} />;
                  })}
                </div>
                {clients?.find((client) => client.id === clientId).owner ? (
                  <>
                    <button
                      onClick={() => {
                        socketRef.current.emit("start", id);
                      }}
                      className="btn self-start"
                    >
                      Start
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-white font-mono">
                      Waiting for owner to start the game...
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-white gap-3 flex items-center text-3xl font-karla font-bold">
            <span className="text-2xl font-bold font-mono text-yellow-600">
              You
            </span>
            {stat.correct}/{stat.all}
            <span className="text-2xl font-normal font-mono text-yellow-600">
              (
              {stat.all === 0
                ? "0.00"
                : ((stat.correct / stat.all) * 100).toFixed(2)}
              )%
            </span>
            <span className="">{time}s</span>
          </div>
          <div className="w-[85vw] max-w-[500px]">
            <div
              className="timer"
              style={{
                "--timer-percentage": 100 - (minuteTime / TIME) * 100 + "%",
              }}
            ></div>
            <CodeSnippet correct={correct} question={state.multi.question} />
            <form
              onSubmit={handleSubmit}
              className="flex mt-4 font-space md:items-center items-end justify-center flex-col md:flex-row gap-3"
            >
              <div className="flex gap-3 justify-center items-center">
                <input
                  ref={answerRef}
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
              {/* <button
                onClick={handleEnd}
                className="text-white bg-sp-red hover:opacity-70 transition-all py-1 px-2"
              >
                end session
              </button> */}
            </form>
          </div>

          {/* other person */}

          <div className="text-white flex items-center gap-3 mt-4 text-3xl font-karla font-bold">
            {Object.entries(other.stats).reduce(
              (ps, a) => ps + a[1].correct,
              0
            )}
            /{Object.entries(other.stats).reduce((ps, a) => ps + a[1].all, 0)}
            <span className="text-2xl fonr-bold font-mono text-yellow-600">
              {
                clients.find((client) => client.name !== globalState.user.name)
                  .name
              }{" "}
            </span>
            <span className="text-2xl font-normal font-mono text-yellow-600">
              {/* (
              {stat.all === 0
                ? "0.00"
                : ((stat.correct / stat.all) * 100).toFixed(2)}
              )% */}
            </span>
            <span className="">{otherTime}s</span>
            <span
              className={`text-[#008000] ${other.correct !== true && "hidden"}`}
            >
              ( +5 )
            </span>
          </div>
          <div className="w-[85vw] max-w-[500px]">
            <div
              className="timer"
              style={{
                "--timer-percentage":
                  100 - (otherMinuteTime / TIME) * 100 + "%",
              }}
            ></div>
            <CodeSnippet correct={other.correct} question={other.question} />
          </div>
        </>
      )}
    </ContentContainer>
  );
};
export default MultiPlay;
