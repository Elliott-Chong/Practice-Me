import React from "react";

function useTimer(initialTime) {
  const [minuteTime, setMinuteTime] = React.useState(initialTime);
  const [time, setTime] = React.useState(initialTime);
  const [ended, setEnded] = React.useState(false);

  const increaseTime = (delta) => {
    if (time + delta > initialTime) {
      setTime(initialTime);
    } else {
      setTime((time) => time + delta);
    }
  };

  const manualSetTime = (time) => {
    setTime(time);
    setMinuteTime(time);
  };

  const [startCounting, setStartCounting] = React.useState(false);

  React.useEffect(() => {
    if (!startCounting) return;
    let minuteTimeInterval = setInterval(() => {
      setMinuteTime((minuteTime) => minuteTime - 0.1);
    }, 100);

    let timeInterval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(minuteTimeInterval);
    };
  }, [startCounting]);
  React.useEffect(() => {
    setMinuteTime(time);
  }, [time]);
  React.useEffect(() => {
    if (time === 0) {
      setEnded(true);
    }
  }, [time]);
  return [
    time,
    ended,
    minuteTime,
    increaseTime,
    manualSetTime,
    setStartCounting,
  ];
}

export default useTimer;
