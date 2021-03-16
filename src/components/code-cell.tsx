
import { useState, useEffect } from "react";
import Preview from "./preview";
import CodeEditor from "./code-editor";
import bundle from "../bundler/index";
import Resizable from './resizable'
import {Cell} from '../state'
import {useActions} from '../hooks/use-actions'


interface CodeCellProps {
  cell: Cell
}

// all logic jsx ect for code cells are here  
const CodeCell: React.FC< CodeCellProps> = ({cell}) => {
  
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const {updateCell} = useActions()

  useEffect(() => {
    const timer  = setTimeout( async()=> {
      // run bundle on timer - when cell.content changes 
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.err);

    }, 1000)
    // thre return function can be added to useffect - it runs 
    // every time useeffect is run
    return () => {
      clearTimeout(timer)
    }
  }, [cell.content])

  

  return (
    // vertical resiable 
    <Resizable direction="vertical">
    <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
      {/* horizontal resizable for code editor*/}
      <Resizable direction="horizontal">
        {/* codeeditor -ie monaco editor */}
        <CodeEditor
          initialValue={cell.content}
          onChange={(value) => updateCell(cell.id, value)}
        />
      </Resizable>
      {/* code preview */}
      <Preview code={code} error={error} />
    </div>
  </Resizable>
  );
};

export default CodeCell
