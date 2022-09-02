import React from "react";
import ContentContainer from "../components/ContentContainer";
import io from "socket.io-client";

function MultiPlay() {
  React.useEffect(() => {
    const socket = io("http://localhost:5000");
    return socket.disconnect;
  }, []);
  return <ContentContainer>yo</ContentContainer>;
}

export default MultiPlay;
