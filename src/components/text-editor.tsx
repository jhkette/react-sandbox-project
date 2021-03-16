import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";
import "./text-editor.css";
import {Cell} from '../state'
// import action creators
import {useActions} from '../hooks/use-actions'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
  // the ref is HTMLDivElement or null
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
 
  const {updateCell} = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log("element clicked on is inside editor");
        return;
      }
      // set editing to false if event.target and ref is different
      setEditing(false);
    };
    console.log("element clicked is not inside editor");
    // run listener on click
    document.addEventListener("click", listener, { capture: true });
    // remove event listener clean up
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={cell.content} onChange={(v) => {
                updateCell(cell.id, v || '')
        }} />
      </div>
    );
  }
  return (
    <div className="text-editor card"  onClick={() => setEditing(true)}>
        <div className="card-content">
      <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
