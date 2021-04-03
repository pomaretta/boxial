import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Home from './Components/Home/Home'
import User from './Components/User/User'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/setup">
          <User />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
