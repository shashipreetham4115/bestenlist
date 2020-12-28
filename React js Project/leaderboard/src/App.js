// import React from 'react';
import './App.css';
import AdminLogin from './components/Admin/Login';
import UserLogin from './components/User/Login';
import UserHome from './components/User/Home';
import AdminHome from './components/Admin/Home'
import AdminQuiz from './components/Admin/Quiz';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactNotification from 'react-notifications-component';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/">
          <div className="App">
          <ReactNotification />
          <UserLogin />
          </div>
        </Route>
        <Route exact={true} path="/home">
        <ReactNotification />
          <UserHome />
        </Route>
        <Route exact={true} path="/admin/quiz">
        <ReactNotification />
          <AdminQuiz />
        </Route>
        <Route exact={true} path="/admin">
        <div className="App">
        <ReactNotification />
          <AdminLogin />
          </div>
        </Route>
        <Route exact={true} path="/admin/home">
        <div className="adminhome">
        <ReactNotification />
          <AdminHome />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
    // <div><AdminLogin></AdminLogin></div>

  );
}

export default App;
