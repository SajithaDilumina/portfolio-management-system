import React, { useEffect, useState } from "react";

export default function Timer({ startTime }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (startTime !== null) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        setTimer({ minutes, seconds });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);
  return (
    <p>
      Time elapsed: {timer.minutes} mins {timer.seconds} seconds
    </p>
  );
}
