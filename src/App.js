import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./views/Home";
import FilmDetails from "./views/FilmDetails";
import Spinner from "./components/Spinner";

function App() {
  return (
    <div className={"container my-5"}>
      <Router>
        <Route exact path={"/"}><Home /></Route>
        <Route path={"/film/:id"}><FilmDetails /></Route>
      </Router>
    </div>
  );
}

export default App;