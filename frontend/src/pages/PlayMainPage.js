import React from "react";
import ContentContainer from "../components/ContentContainer";
import singleplayerimg from "../images/one.png";
import pvpimg from "../images/sword.png";
import { useHistory, Link } from "react-router-dom";

function PlayMainPage() {
  const history = useHistory();
  return (
    <ContentContainer className="flex flex-col md:flex-row justify-center items-center">
      <div className="px-4 md:max-w-[75vw] w-[90vw] flex flex-col md:flex-row justify-center items-center gap-6">
        <div
          id="singleplayer"
          className="p-12 bg-gray-900 w-[300px] group relative h-[300px] overflow-hidden shadow-xl"
        >
          <div className="bg-gray-900 w-full h-full top-[-100%] flex flex-col gap-2 justify-center items-center group-hover:top-0 right-0 transition-all duration-[250ms] absolute">
            <Link to="/single-config" className="btn">
              Practice
            </Link>
            <Link to="/single-config" className="btn">
              Ranked
            </Link>
          </div>
          <img src={singleplayerimg} alt="single player" />
        </div>
        <div
          id="multiplayer"
          className="p-6 bg-gray-900 w-[300px] h-[300px] relative shadow-xl overflow-hidden group"
        >
          <div className="bg-gray-900 w-full h-full top-[-100%] flex flex-col gap-2 justify-center items-center group-hover:top-0 right-0 transition-all duration-[250ms] absolute">
            <button className="btn">Join room</button>
            <button className="btn">Create room</button>
            <button className="btn">Join random</button>
          </div>
          <img src={pvpimg} alt="pvp" />
        </div>
      </div>
    </ContentContainer>
  );
}

export default PlayMainPage;
