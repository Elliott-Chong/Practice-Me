import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeSnippet({ question, correct }) {
  return (
    <SyntaxHighlighter
      customStyle={{
        width: "100%",
        boxShadow: `0 0 10px ${
          correct === true ? "#00ff00" : correct === "neutral" ? "" : "red"
        }`,
      }}
      style={twilight}
      showLineNumbers={true}
      language="javascript"
    >
      {question}
    </SyntaxHighlighter>
  );
}

export default CodeSnippet;
