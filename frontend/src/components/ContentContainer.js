import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

function ContentContainer(props) {
  const size = useWindowSize();
  const {
    state: { nav_height },
  } = useGlobalContext();
  React.useEffect(() => {
    console.log("run");
    containerRef.current.style.minHeight = size.height - nav_height + "px";
  }, [nav_height, size.height]);
  const containerRef = React.useRef();
  return (
    <main ref={containerRef} id="content-container" {...props}>
      {props.children}
    </main>
  );
}

export default ContentContainer;
