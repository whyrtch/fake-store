import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login/Login";
import ListUser from "./pages/Users/ListUser";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/users" component={ListUser} />
              <Route path="/add-user" component={AddUser} />
              <Route path="/edit-user" component={EditUser} />
              <Route component={ErrorPage} />
          </Switch>
      </Router>
  );
}

export default App;
