
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
    <div>

      <hr />

      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component={Auth(LandingPage ,null)} />
                      {/* Auth 컴퍼넌트에 LandingPage 컴퍼넌트를 감싸게함 
                      Auth 컴퍼넌트의 파라미터 SpecificComponent = LandingPage, option = 접근 권한 
                      어드민 유저만 접근이 가능한 경우 
                      -> <Route exact path="/" component={Auth(LandingPage ,null ,true)} />
                      */}
 
        <Route exact path="/login" component={Auth(LoginPage, false)} />
    
        <Route exact path="/register" component={Auth(RegisterPage, false)} />

      </Switch>
    </div>
  </Router> 
  );
}

export default App;
