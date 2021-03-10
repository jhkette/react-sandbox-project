
import { useState } from "react";
import Preview from "./preview";
import CodeEditor from "./code-editor";
import bundle from "../bundler/index";
import Resizable from './resizable'

// all logic jsx ect for code cells are here
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Resizable direction="horizontal">
        <CodeEditor
          initialValue="const a = 1;"
          onChange={(value) => setInput(value)}
        />
      </Resizable>
      <Preview code={code} />
    </div>
  </Resizable>
  );
};

export default CodeCell
