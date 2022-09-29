import React from "react";
import ContentContainer from "../components/ContentContainer";
import io from "socket.io-client";
import { useGlobalContext } from "../context";
import { MagnifyingGlass } from "react-loader-spinner";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import CodeSnippet from "../components/CodeSnippet";
import useTimer from "../components/useTimer";
import { useHistory } from "react-router-dom";

function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
}

function UserCard({ user }) {
  return (
    <div className="w-full bg-gray-700 text-center font-bold text-white font-mono p-4">
      {user.email}
    </div>
  );
}

function MultiPlay({ match }) {
  const socketRef = React.useRef();
  const roomCode = match.params.id;
  const [found, setFound] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [players, setPlayers] = React.useState([]);
  const { setAlert, state, fetchQuestion, updateScore, dispatch } =
    useGlobalContext();
  const { user, single } = state;

  // const inputRef = React.useRef();
  const [time, ended, minuteTime, increaseTime] = useTimer(30);
  const history = useHistory();

  React.useEffect(() => {
    if (!user) return;
    try {
      // const socket = io("http://localhost:5000", { forceNew: true });
      const socket = io("http://192.168.50.74:5000", { forceNew: true });
      socketRef.current = socket;
      socket.emit("join room", roomCode, user.name);
      socket.on("game status", (payload) => {
        setFound(payload.status);
        // setStarted(payload.status);
        if (payload.players) {
          setPlayers(payload.players);
        }
      });
      socket.on("start game", () => {
        setStarted(true);
      });
      return () => {
        socketRef.current.disconnect();
      };
    } catch (error) {
      console.error(error);
    }
  }, [user, roomCode]);
  const inputRef = React.useRef();

  const [answer, setAnswer] = React.useState("");
  const [correct, setCorrect] = React.useState("neutral");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      answer.toString().toLowerCase() ===
      state.single.answer.toString().toLowerCase()
    ) {
      increaseTime(5);
      setStat((stat) => {
        return { all: stat.all + 1, correct: stat.correct + 1 };
      });
      dispatch({
        type: "update_single_stats",
        payload: { correct: true, topic: state.single.currentTopic },
      });
      setCorrect(true);
      if (single.ranked) {
        updateScore(1);
      }
    } else {
      setStat({ ...stat, all: stat.all + 1 });
      dispatch({
        type: "update_single_stats",
        payload: { correct: false, topic: state.single.currentTopic },
      });
      setCorrect(false);
      if (single.ranked) {
        updateScore(-1);
      }
    }
    setAnswer("");
    inputRef.current.focus();
    setTimeout(() => {
      setCorrect("neutral");
    }, 1000);
    fetchQuestion();
  };
  const handleEnd = (e) => {
    e.preventDefault();
    dispatch({ type: "update_single_end_status", payload: true });
    history.push("/single-results");
  };

  const [stat, setStat] = React.useState({
    // all: Object.entries(state?.single?.stats).reduce(
    //   (partialSum, a) => partialSum + a[1].all,
    //   0
    // ),
    // correct: Object.entries(state?.single?.stats).reduce(
    //   (partialSum, a) => partialSum + a[1].correct,
    //   0
    // ),
  });

  React.useEffect(() => {
    if (!started) return;
    // fetchQuestion();
  }, [started]);

  return (
    <ContentContainer className="flex justify-center items-center">
      {!started ? (
        <>
          <div className="flex shadow-xl flex-col md:w-[30vw] md:min-w-[500px] w-[80vw]">
            <div className="bg-gray-900 py-4 px-4 justify-center font-space flex-col md:flex-row flex gap-4 items-center font-bold text-white w-full">
              <h1 className="text-3xl inline">{roomCode}</h1>

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
                    copyToClipboard(window.location.href);
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
                <div className="flex w-full gap-4">
                  <UserCard user={players[0]} />
                  <UserCard user={players[1]} />
                </div>
                <button
                  onClick={() => {
                    setStarted(true);
                    socketRef.current.emit("start game", roomCode);
                  }}
                  className="btn self-start"
                >
                  Start
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-[85vw] max-w-[500px]">
            <div
              className="timer"
              style={{
                "--timer-percentage": 100 - (minuteTime / 30) * 100 + "%",
              }}
            ></div>
            <CodeSnippet correct={correct} question={state?.single?.question} />
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
                onClick={handleEnd}
                className="text-white bg-sp-red hover:opacity-70 transition-all py-1 px-2"
              >
                end session
              </button>
            </form>
          </div>
        </>
      )}
    </ContentContainer>
  );
}

export default MultiPlay;
