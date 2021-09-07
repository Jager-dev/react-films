import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./views/Home";
import FilmDetails from "./views/FilmDetails";
import Actors from "./views/Actors";
import ActorsDetails from "./views/ActorsDetails";

function App() {
  return (
    <div className={"container my-5"}>
      <Router>
        <Route exact path={"/"}><Home /></Route>
        <Route path={"/film/:id"}><FilmDetails /></Route>
        <Route path={"/actors/:id"}><Actors /></Route>
        <Route path={"/actorsdetails/:id"}><ActorsDetails /></Route>
      </Router>
    </div>
  );
}

export default App;