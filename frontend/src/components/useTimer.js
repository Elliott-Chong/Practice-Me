import React from "react";

function useTimer(initialTime) {
  const [time, setTime] = React.useState(initialTime);
  const [ended, setEnded] = React.useState(false);
  const [minuteTime, setMinuteTime] = React.useState(initialTime);
  React.useEffect(() => {
    let timeInterval = setInterval(() => {
      console.log("what");
      setTime((time) => time - 1);
    }, 1000);

    let minuteTimeInterval = setInterval(() => {
      setMinuteTime((minuteTime) => minuteTime - 0.1);
    }, 100);

    return () => {
      clearInterval(timeInterval);
      clearInterval(minuteTimeInterval);
    };
  });
  React.useEffect(() => {
    if (time === 0) {
      setEnded(true);
    }
  }, [time]);
  return [time, ended, minuteTime];
}

export default useTimer;
