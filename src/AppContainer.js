import { connect } from 'react-redux';
import { maintainSignIn, setReady, setUserInfo } from './modules/user';
import App from './App';

const mapStateToProps = state => ({
  isSignIn: state.user.status.isSignIn,
  isReady: state.user.status.isReady,
});

const mapDispatchToProps = dispatch => {
  return {
    handleSignIn: isSignIn => {
      return dispatch(maintainSignIn(isSignIn));
    },
    handleReady: isReady => {
      return dispatch(setReady(isReady));
    },
    handleUserInfo: info => {
      return dispatch(setUserInfo(info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
