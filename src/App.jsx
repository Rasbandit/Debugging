import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Nav from './components/Nav';
import Favorites from './components/Favories';
import Details from './components/Details';
import Wizzard from './components/wizzard/Wizzard';
import ListedHouses from './components/ListedHouses';
import EditHouse from './components/EditHouse';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/details/:id" component={Details} />
          <Route path="/wizzard" component={Wizzard} />
          <Route path="/listed" component={ListedHouses} />
          <Route path="/edit/:id" component={EditHouse} />
        </Switch>
      </div>
    );
  }
}

export default App;
