import React from "react";
import { useHistory } from "react-router-dom";
import ContentContainer from "../components/ContentContainer";
import { useGlobalContext } from "../context";
import { useQuestionsContext } from "../questionsContext";

function MultiJoinPage() {
  const history = useHistory();
  const inputRef = React.useRef();
  const { setAlert } = useGlobalContext();
  const { dispatch } = useQuestionsContext();
  React.useEffect(() => {
    dispatch({
      type: "update_multi_start_status",
      payload: false,
    });
    // dispatch({ type: "reset_multi_config" });
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let game_code = inputRef.current.value;
    if (game_code === "") {
      setAlert("error", "Please enter a valid code");
      return;
    }
    dispatch({ type: "update_multi_start_status", payload: true });
    history.push("/multi-play/" + game_code.toLowerCase());
  };

  return (
    <ContentContainer className="flex flex-col md:flex-row py-10 justify-center items-center">
      <div className="flex shadow-xl flex-col">
        <div className="bg-gray-900 py-4 px-4 justify-center font-space flex-col md:flex-row flex gap-4 items-center font-bold text-white w-full">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 justify-center"
          >
            <input
              ref={inputRef}
              placeholder="CODE"
              type="text"
              className="text-black font-bold text-xl w-[150px] py-1 px-2 text-center border-none outline-none"
            />
            <button className="btn" type="submit">
              Join Game!
            </button>
          </form>
        </div>
      </div>
    </ContentContainer>
  );
}

export default MultiJoinPage;
