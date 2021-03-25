import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import {Provider} from 'react-redux'
import {store} from './state'
import ReactDOM from "react-dom";
// import TextEditor from "./components/text-editor";
import CellList from "./components/cell-list";
import Intro from "./components/intro"

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <Intro />
      <CellList />
    </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
