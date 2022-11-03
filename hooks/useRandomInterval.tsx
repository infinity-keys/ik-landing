import random from "lodash/random";
import { useEffect, useRef, useCallback } from "react";

const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
) => {
  const timeoutId = useRef<number>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof minDelay === "number" && typeof maxDelay === "number") {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId?.current);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
};

export default useRandomInterval;
