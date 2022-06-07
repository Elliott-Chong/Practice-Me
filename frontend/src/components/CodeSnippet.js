import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeSnippet({ question }) {
  return (
    <SyntaxHighlighter
      style={twilight}
      showLineNumbers={true}
      language="javascript"
    >
      {question}
    </SyntaxHighlighter>
  );
}

export default CodeSnippet;
