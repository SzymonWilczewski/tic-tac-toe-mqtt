import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./ui/Home";
import Game from "./ui/Game";
import Join from "./ui/Join";
import Spectate from "./ui/Spectate";
import SpectateJoin from "./ui/SpectateJoin";
import NotFound from "./ui/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/game/:id" component={Game} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/spectate/:id" component={Spectate} />
        <Route exact path="/spectate" component={SpectateJoin} />
        <Route path="/" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
