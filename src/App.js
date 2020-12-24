import React from 'react';
import EnableNotification from './components/EnableNotifications';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import T from './components/T';
function App() {

  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={EnableNotification} />
      <Route exact path='/t' component={T} />
      </Switch>
    </div>
  );
}

export default App;
