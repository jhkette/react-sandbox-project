
import { useState, useEffect } from "react";
import Preview from "./preview";
import CodeEditor from "./code-editor";
import bundle from "../bundler/index";
import Resizable from './resizable'

// all logic jsx ect for code cells are here
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer  = setTimeout( async()=> {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.err);

    }, 1000)
    // thre return function can be added to useffect - it runs 
    // every time useeffect is run
    return () => {
      clearTimeout(timer)
    }
  }, [input])

  

  return (
    // vertical resiable 
    <Resizable direction="vertical">
    <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      {/* horizontal resizable for code editor*/}
      <Resizable direction="horizontal">
        {/* codeeditor -ie monaco editor */}
        <CodeEditor
          initialValue="const a = 1;"
          onChange={(value) => setInput(value)}
        />
      </Resizable>
      {/* code preview */}
      <Preview code={code} error={error} />
    </div>
  </Resizable>
  );
};

export default CodeCell
