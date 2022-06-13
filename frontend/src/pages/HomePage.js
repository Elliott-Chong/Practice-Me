import React from "react";
import ContentContainer from "../components/ContentContainer";

// The following are hardcoded examples of data that is fetched from server
const top10 = [
  {
    key: 1,
    rank: 1,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 2,
    rank: 2,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 3,
    rank: 3,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 4,
    rank: 4,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 5,
    rank: 5,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 6,
    rank: 6,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 7,
    rank: 7,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 8,
    rank: 8,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key:9,
    rank: 9,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
  {
    key: 10,
    rank: 10,
    email: "elliottchong.22@ichat.edu.sg",
    class: "DIT/1A/02"
  },
]

const currentUser = {
  email: "elliottchong.22@ichat.edu.sg",
  rank: 100,
  wins: 2034
}

const week = 1
// End of example data

const leaderboardRow = top10.map(user => {
  return(
    <tr className="m-3 xl:text-xl" key={user.key}>
      <td className="px-3 py-1">{user.rank}</td>
      <td className="px-3 py-1 break-all">{user.email}</td>
      <td className="px-3 py-1">{user.class}</td>
    </tr>
  )
})
  
function HomePage() {
  return (
    <ContentContainer className="flex items-center justify-evenly flex-col lg:flex-row">
      <div className="flex flex-col my-10">
        <div className="max-w-sm bg-gray-900 text-center text-white font-bold border border-2 border-white rounded-xl p-10 mb-12">
          <h1 className="text-2xl">
            Welcome to
            <span className="text-sp-red"> practice</span>
            <span className="">Me,</span>
          </h1>
          <h3 className="mt-2 font-bold underline text-xl break-all mb-4">
            {currentUser.email}
          </h3>
        </div>

        <div className="w-full max-w-sm rounded-xl border-2 border-white bg-gray-900 text-white px-10 py-5 md:px-10 md:py-10">
            <h1 className="text-2xl font-bold text-blue-500 text-center mb-2">Statistics</h1>
            <hr></hr>
            <section className="font-bold text-center flex flex-col justify-evenly mt-2">
              <p className="text-lg text-sp-red">Rank : {currentUser.rank}</p>
              <p className="text-lg">Wins : {currentUser.wins}</p>
              <p className="text-lg">Week : {week}</p>
            </section>
        </div>
      </div>

      <div className="w-full max-w-sm xl:max-w-4xl md:max-w-xl sm:max-w-md rounded-2xl
      border-2 border-white bg-gray-900 text-white flex flex-col p-10 mb-10">
        <h1 className="text-4xl font-bold text-blue-500 text-center mb-4 xl:text-6xl">Leaderboard</h1>
        <hr></hr>
        <table className="text-center rounded-xl border-separate mt-4">
          <thead>
            <tr className="m-3">
              <th className="px-3 pt-1 text-sp-red text-lg xl:text-3xl">Rank</th>
              <th className="px-3 pt-1 break-all text-sp-red text-lg xl:text-3xl">Email</th>
              <th className="px-3 pt-1 text-sp-red text-lg xl:text-3xl">Class</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardRow}
          </tbody>
        </table>
      </div>
    </ContentContainer>
  )
}

export default HomePage;