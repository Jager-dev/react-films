import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./views/Home";

function App() {
  return (
    <div className={"container"}>
      <Router>
        <Route path={"/"}><Home /></Route>
      </Router>
    </div>
  );
}

export default App;