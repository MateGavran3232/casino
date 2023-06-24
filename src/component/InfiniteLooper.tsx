import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/InfiniteLooper.css";

const InfiniteLooper = function InfiniteLooper({
  speed,
  direction,
  children,
}: {
  speed: number;
  direction: "right" | "left";
  children: React.ReactNode;
}) {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const resetAnimation = useCallback(() => {
    if (innerRef?.current) {
      innerRef.current.setAttribute("data-animate", "false");

      setTimeout(() => {
        if (innerRef?.current) {
          innerRef.current.setAttribute("data-animate", "true");
        }
      }, 10);
    }
  }, []);

  const setupInstances = useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();
    const { width: parentWidth } = outerRef.current.getBoundingClientRect();
    const widthDeficit = parentWidth - width;
    const instanceCount = Math.ceil(widthDeficit / width) + 2; // Add 2 instances
    setLooperInstances(instanceCount);
    resetAnimation();
  }, [resetAnimation]);

  useEffect(() => {
    setupInstances();
  }, [setupInstances]);

  useEffect(() => {
    window.addEventListener("resize", setupInstances);

    return () => {
      window.removeEventListener("resize", setupInstances);
    };
  }, [setupInstances]);

  return (
    <div className="looper" ref={outerRef}>
      <div className="looper__innerList" ref={innerRef} data-animate="true">
        {[...Array(looperInstances)].map((_, ind) => {
          const isLastInstance = ind === looperInstances - 1;
          return (
            <div
              key={ind}
              className="looper__listInstance"
              style={{
                animationDuration: `${speed}s`,
                animationDirection:
                  direction === "right" ? "reverse" : "normal",
                marginRight: isLastInstance ? "5rem" : undefined,
              }}
            >
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteLooper;
