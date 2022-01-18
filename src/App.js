import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Githubstate from './context/github/GithubState';
import AlertState from "./context/alert/AlertState";
import './App.css';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

const App = () => {


    return(
      <Githubstate>
        <AlertState>
      <Router>
      <div className='App'>
       <Navbar />
        <div className='container'>
          < Alert alert={alert}/>
          <Switch>
            <Route exact path='/' 
            render={props => (
              <Fragment>
               <Search />
               <Users />
              </Fragment>
               )}
           />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' component={User}/> 
          </Switch>
        
        </div> 
        </div>
        </Router>
        </AlertState>
        </Githubstate>
      );
          }


export default App;
