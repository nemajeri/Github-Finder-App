import React, { Fragment, Component } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Users from './components/Users/Users';
import User from './components/Users/User';
import './App.css';
import axios from 'axios';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    users:[],
    user: {} ,
    repos: [],
    loading: false,
    alert: null,
  }



  //async componentDidMount() {
  //  console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET)
  //  this.setState({loading: true});
  //  const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
 // this.setState({users: res.data, loading: false});
//}
  // Search Github users
  searchUsers = async text => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
    this.setState({users: res.data.items, loading: false});

  }

  //Get single Github user
  getUser = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
  
    this.setState({user: res.data, loading: false});
  }

  //Get Users Repos
  getUserRepos = async username => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
  
    this.setState({repos: res.data, loading: false});
  }

  //Clear users from state 
  clearUsers = () => this.setState({ users: [], loading: false})
  //set Alert
  setAlert = (message,type) => {this.setState({alert: {message, type}})
  //set Timer for Alert
  setTimeout(() => this.setState({ alert: null }), 5000)
};


  render() {

    const {users, loading, user, repos} = this.state

    return(
      <Router>
      <div className='App'>
       <Navbar />
        <div className='container'>
          < Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
               <Search searchUsers={this.searchUsers} 
               clearUsers={this.clearUsers} 
               showClear={users.length > 0 ? true : false} 
               setAlert={this.setAlert}/>
               <Users loading= {loading} users= {users} />
              </Fragment>
               )}
           />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User { ...props} 
            getUser={this.getUser} 
            user={user} loading={loading}
            getUserRepos={this.getUserRepos}
            repos={repos}/>
          )}  />
          </Switch>
        
        </div> 
        </div>
        </Router>
      );
  }
}

export default App;
