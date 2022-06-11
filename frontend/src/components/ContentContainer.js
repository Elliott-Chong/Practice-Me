import React from "react";
import { useGlobalContext } from "../context";

function ContentContainer(props) {
  const {
    state: { nav_height },
  } = useGlobalContext();
  React.useEffect(() => {
    containerRef.current.style.minHeight =
      window.innerHeight - nav_height + "px";
  }, [nav_height]);
  const containerRef = React.useRef();
  return (
    <main ref={containerRef} id="content-container" {...props}>
      {props.children}
    </main>
  );
}

export default ContentContainer;
