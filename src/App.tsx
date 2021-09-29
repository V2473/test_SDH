import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Contacts from './components/Contacts/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


function App(): JSX.Element {
  return (
    <Router>
      <Switch>
      <Route exact path="/contact" component={Contacts}/>
      <Route exact path="/contact/:id" component={Contacts}/>
      <Route exact path="/contact/create" component={Contacts}/>
      <Redirect from="/" to="/contact" />
      </Switch>
    </Router>
  );
}

export default App;
