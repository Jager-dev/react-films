import {BrowserRouter as Router, Route} from "react-router-dom"
import Home from "./views/Home";
import FilmDetails from "./views/FilmDetails";
import Actors from "./views/Actors";
import ActorsDetails from "./views/ActorsDetails";
import BrowseResult from "./views/BrowseResult";
import Browse from "./components/Browse";

function App() {
  return (
    <div>
      <Router>
        <Browse />
        <div className={"container my-5"}>
        <Route exact path={"/"}><Home /></Route>
        <Route path={"/film/:id"}><FilmDetails /></Route>
        <Route path={"/actors/:id"}><Actors /></Route>
        <Route path={"/actorsdetails/:id"}><ActorsDetails /></Route>
        <Route path={"/browse/:name"}><BrowseResult /></Route>
        </div>
      </Router>
    </div>
  );
}

export default App;