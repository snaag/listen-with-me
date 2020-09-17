import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import NavigationContainer from './components/navigation/containers/NavigationContainer';
import MainPage from './components/pages/main/containers/MainPage';
import ListenPageContainer from './components/pages/listen/containers/ListenPageContainer';
import MusicPage from './components/pages/music/containers/MusicPage';
import PlayListPage from './components/pages/playlist/containers/PlayListPage';
import ProfilePageContainer from './components/pages/profile/containers/ProfilePageContainer';
import UserTab from './components/tabs/UserTab';
import './css/Reset.css';

class App extends Component {
  componentDidMount() {
    const { handleSignIn, handleReady, handleUserInfo } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    if (authorization) {
      fetch(
        'http://ec2-15-164-52-99.ap-northeast-2.compute.amazonaws.com:4000/user/token',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: authorization,
          },
          credentials: 'include',
        }
      )
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            localStorage.removeItem('authorization');
            handleReady(true);
          }
        })
        .then(info => {
          if (info.email) {
            handleUserInfo(info);
            handleSignIn(true);
            handleReady(true);
          }
        })
        .catch(err => console.log(err));
    } else {
      handleReady(true);
    }
  }

  render() {
    const { isReady, isSignIn } = this.props;

    return (
      <Router>
        <>
          <NavigationContainer />
        </>
        <>
          <Link to="/">MainPage</Link>
          <Link to="/listen">ListenPage</Link>
          <Link to="/music">MusicPage</Link>
          <Link to="/playlist">PlayListPage</Link>
          <Link to="/profile">ProfilePage</Link>
        </>
        {isReady && (
          <Switch>
            <Route
              exact
              path="/listen"
              render={() =>
                isSignIn ? <ListenPageContainer /> : <Redirect to="/" />
              }
            />
            <Route
              exact
              path="/music"
              render={() =>
                isSignIn ? (
                  <>
                    <UserTab />
                    <MusicPage />
                  </>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/playlist"
              render={() =>
                isSignIn ? (
                  <>
                    <UserTab />
                    <PlayListPage />
                  </>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/profile"
              render={() =>
                isSignIn ? (
                  <>
                    <UserTab />
                    <ProfilePageContainer />
                  </>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route exact path="/" render={() => <MainPage />} />
            <Route path="/" render={() => <Redirect to="/" />} />
          </Switch>
        )}
      </Router>
    );
  }
}

export default App;
