import "./preview.css";
import { useRef, useEffect } from "react";

interface PreviewProps {
  code: string
  error: string
}
// html for i frame 
// error handling is done inside
// eval(event.data) handles data that is sen 
const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);

        }
          window.addEventListener('error', (event) => {
            event.preventDefault()
             handleError(event.error)
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
             handleError(err) 
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code , error}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // set srcdoc
    iframe.current.srcdoc = html;
    // postmessage to iframe -- need to be delayed - for html of iframe to load first - otherwose error occurs
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  console.log(error)
  return (
    // wrap iframe in wrapper
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
