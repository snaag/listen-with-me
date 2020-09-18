import { connect } from 'react-redux';
import { maintainSignIn, setReady, setUserInfo } from './modules/user';
import App from './App';

const mapStateToProps = state => ({
  isSignIn: state.user.status.isSignIn,
  isReady: state.user.status.isReady,
});

const mapDispatchToProps = dispatch => {
  return {
    handleSignIn: () => {
      return dispatch(maintainSignIn());
    },
    handleReady: () => {
      return dispatch(setReady());
    },
    handleUserInfo: info => {
      return dispatch(setUserInfo({ info }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
