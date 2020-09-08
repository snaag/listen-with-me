import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import NavigationContainer from './components/navigation/containers/NavigationContainer';
import MainPage from './components/pages/main/MainPage';
import ListenPageContainer from './components/pages/listen/containers/ListenPageContainer';
import MusicPage from './components/pages/music/MusicPage';
import PlayListPage from './components/pages/playlist/containers/PlayListPage';
import ProfilePageContainer from './components/pages/profile/containers/ProfilePageContainer';
import UserTab from './components/tabs/UserTab';
import './css/Reset.css';

function App() {
  return (
    <Router>
      <>
        <NavigationContainer />
      </>
      <>
        <Link to="/main">MainPage</Link>
        <Link to="/listen">ListenPage</Link>
        <Link to="/music">MusicPage</Link>
        <Link to="/playlist">PlayListPage</Link>
        <Link to="/profile">ProfilePage</Link>
      </>
      <Switch>
        <Route path="/main">
          <MainPage />
        </Route>
        <Route path="/listen">
          <ListenPageContainer />
        </Route>
        <Route path="/music">
          <UserTab />
          <MusicPage />
        </Route>
        <Route path="/playlist">
          <UserTab />
          <PlayListPage />
        </Route>
        <Route path="/profile">
          <UserTab />
          <ProfilePageContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
