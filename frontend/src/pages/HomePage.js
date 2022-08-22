import React from "react";
import ContentContainer from "../components/ContentContainer";

// The following are hardcoded examples of data that is fetched from server
const top10 = [
  {
    key: 1,
    rank: 1,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02",
  },
  {
    key: 2,
    rank: 2,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02",
  },
  {
    key: 3,
    rank: 3,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02",
  },
  // {
  //   key: 4,
  //   rank: 4,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 5,
  //   rank: 5,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 6,
  //   rank: 6,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 7,
  //   rank: 7,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 8,
  //   rank: 8,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 9,
  //   rank: 9,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 10,
  //   rank: 10,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 11,
  //   rank: 11,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 12,
  //   rank: 12,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 13,
  //   rank: 13,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
  // {
  //   key: 14,
  //   rank: 14,
  //   email: "elliottchong.22@ichat.edu.sg",
  //   class: "DIT/1A/02",
  // },
];

const currentUser = {
  email: "elliottchong.22@ichat.edu.sg",
  rank: 100,
  wins: 2034,
};

const week = 1;
// End of example data

const leaderboardRow = top10.map((user) => {
  return (
    <tr className="m-3 xl:text-xl" key={user.key}>
      <td className="px-3 py-1">{user.rank}</td>
      <td className="px-3 py-1 break-all">{user.email}</td>
      <td className="px-3 py-1">{user.class}</td>
    </tr>
  );
});

function HomePage() {
  return (
    <ContentContainer className="flex justify-center items-center">
      <div className="px-4 md:max-w-[75vw] w-[90vw] flex flex-col md:flex-row justify-center items-start gap-6">
        <div
          id="stats"
          className="p-8 bg-gray-900 text-white w-full md:w-auto flex flex-col gap-4 font-karla text-2xl shadow-xl text-left"
        >
          <div>
            Good morning <span className="font-bold">Elliott</span>
          </div>
          <div>
            <span>Ranking:</span>
            <span className="font-bold">&nbsp;1</span>
          </div>
          <div>
            <span>Score:</span>
            <span className="font-bold">&nbsp;3,490</span>
          </div>
        </div>
        <div
          id="leaderboard"
          className="p-6 px-12 bg-gray-900 w-full md:w-auto overflow-scroll max-h-[80vh] md:max-h-[40vw] shadow-xl"
        >
          <table class="table-auto text-white font-karla text-xl w-full ">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((user) => {
                return (
                  <tr key={user.key}>
                    <td>{user.rank}</td>
                    <td>{user.email}</td>
                    <td>{user.class}</td>
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
