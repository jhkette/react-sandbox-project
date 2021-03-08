
import { useState } from "react";

import Preview from "./preview";
import CodeEditor from "./code-editor";
import bundle from "../bundler/index";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      {/* function goes to code editor as prop  as does initial value*/}
      <CodeEditor
        initialValue="const a = 1"
        onChange={(value) => setInput(value)}
      />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* <pre>{code}</pre> */}
      <Preview code={code} />
    </div>
  );
};

export default CodeCell
