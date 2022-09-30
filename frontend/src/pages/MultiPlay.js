import React from "react";
import { useQuestionsContext } from "../questionsContext";
import io from "socket.io-client";
import { useGlobalContext } from "../context";
import ContentContainer from "../components/ContentContainer";

const MultiPlay = ({ match }) => {
  const { state } = useQuestionsContext();
  const { state: globalState } = useGlobalContext();
  const id = match.params.id;
  const [clientId, clientIdSet] = React.useState("");
  const [clients, clientsSet] = React.useState([]);

  const socketRef = React.useRef();
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

    socket.on("join", (payload) => {
      console.log(payload);
      clientsSet(payload.clients);
    });

    return () => socketRef.current.disconnect();
  }, []);
  return <ContentContainer>hi</ContentContainer>;
};
export default MultiPlay;
