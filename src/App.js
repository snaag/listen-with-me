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
import * as api from './api/app';
import './css/Reset.css';

class App extends Component {
  async componentDidMount() {
    const { handleSignIn, handleReady, handleUserInfo } = this.props;
    const authorization = localStorage.getItem('authorization') || '';

    try {
      const { status, data } = await api.maintainSignIn(authorization);
      if (status === 200 && data.email) {
        console.log('maintain signin data:', data);
        handleUserInfo(data);
        handleSignIn(true);
        handleReady();
      }
    } catch (err) {
      localStorage.removeItem('authorization');
      handleReady();
      console.log(err);
    }
  }

  render() {
    const { isReady, isSignIn } = this.props;

    return (
      <Router>
        <>
          <NavigationContainer />
        </>
        {/* <>
          <Link to="/">MainPage</Link>
          <Link to="/listen">ListenPage</Link>
          <Link to="/music">MusicPage</Link>
          <Link to="/playlist">PlayListPage</Link>
          <Link to="/profile">ProfilePage</Link>
        </> */}
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
