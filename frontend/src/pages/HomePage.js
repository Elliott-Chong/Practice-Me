import React from "react";
import ContentContainer from "../components/ContentContainer";
import { useGlobalContext } from "../context";

function HomePage() {
  const { state, getAllUsers } = useGlobalContext();

  const [allUsers, setAllUsers] = React.useState([]);
  const [rank, setRank] = React.useState();
  React.useEffect(() => {
    getAllUsers().then((res) => {
      res = res.sort((a, b) => b.score - a.score);
      for (let i = 0; i < res.length; i++) {
        if (res[i].id === state.user?.id) {
          setRank(i + 1);
          break;
        }
      }
      setAllUsers(res);
    });
  }, [getAllUsers, setAllUsers, state.user]);

  // React.useEffect(() => {
  //   console.log(allUsers);
  // }, [allUsers]);
  return (
    <ContentContainer className="flex justify-center py-10 items-center">
      <div className="px-4 md:max-w-[75vw] w-[90vw] flex flex-col md:flex-row justify-center items-start gap-6">
        <div
          id="stats"
          className="p-8 bg-gray-900 text-white w-full md:w-auto flex flex-col gap-4 font-karla text-2xl shadow-xl text-left"
        >
          {state.user ? (
            <>
              <div>
                Good morning{" "}
                <span className="font-bold">{state.user?.name}</span>
              </div>
              <div>
                <span>Ranking:</span>
                <span className="font-bold">&nbsp;{rank}</span>
              </div>
              <div>
                <span>Score:</span>
                <span className="font-bold">&nbsp;{state.user?.score}</span>
              </div>
            </>
          ) : (
            <span className="text-md">
              <a href="/login" className="underline">
                Login
              </a>{" "}
              to see your stats
            </span>
          )}
        </div>
        <div
          id="leaderboard"
          className="p-6 px-12 bg-gray-900 w-full md:w-auto overflow-scroll max-h-[80vh] md:max-h-[40vw] shadow-xl scrollbar-thin scrollbar-thumb-gray-600"
        >
          <table className="table-auto text-white font-karla text-xl w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Class</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length > 0 &&
                allUsers.map((user, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={`${
                        user.id === state.user?.id &&
                        "bg-red-600 font-bold sticky bottom-0 top-0"
                      }`}
                    >
                      <td>{idx + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.class}</td>
                      <td>{user.score}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </ContentContainer>
  );
}

export default HomePage;
