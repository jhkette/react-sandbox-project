import "./code-cell.css";
import { useEffect } from "react";
import Preview from "./preview";
import CodeEditor from "./code-editor";

import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

// all logic jsx ect for code cells are here
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      // run bundle on timer - when cell.content changes
      createBundle(cell.id, cumulativeCode);
    }, 1000);
    // thre return function can be added to useffect - it runs
    // every time useeffect is run
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    // vertical resiable
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* horizontal resizable for code editor*/}
        <Resizable direction="horizontal">
          {/* codeeditor -ie monaco editor */}
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/* code preview */}
        {!bundle || bundle.loading ? (
          <div className="progress-wrapper">
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} error={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
