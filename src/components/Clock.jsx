import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch({ iniciar }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    if (!iniciar) {
      pause();
    } else {
      start();
    }
  }, [iniciar]);
  return (
    <div style={{ textAlign: "center" }}>
      <p>Tempo de trabalho</p>
      <div style={{ fontSize: "100px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default MyStopwatch;
