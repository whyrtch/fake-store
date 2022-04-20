import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login/Login";
import ListUser from "./pages/Users/ListUser";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AddUser from "./pages/Users/AddUser";
import EditUser from "./pages/Users/EditUser";
import DetailUser from "./pages/Users/DetailUser";

function App() {
  return (
      <div className="h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                  <Router>
                      <Switch>
                          <Route exact path="/" component={Login} />
                          <Route path="/users" component={ListUser} />
                          <Route path="/add-user" component={AddUser} />
                          <Route path="/edit-user" component={EditUser} />
                          <Route path="/detail-user" component={DetailUser} />
                          <Route component={ErrorPage} />
                      </Switch>
                  </Router>
              </div>
          </div>
      </div>
  );
}

export default App;
