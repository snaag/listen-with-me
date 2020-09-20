import { connect } from 'react-redux';
import { setNickname } from '../../../../modules/main';
import { maintainSignIn } from '../../../../modules/user';

import SearchUser from '../components/SearchUser';

const mapStateToProps = state => ({
  nickname: state.main.nickname,
  isSignIn: state.user.status.isSignIn,
  myNickname: state.user.info.nickname,
});

const mapDispatchToProps = dispatch => {
  return {
    handleNickname: nickname => {
      return dispatch(setNickname({ nickname }));
    },
    handleSignIn: boolean => {
      return dispatch(maintainSignIn({ boolean }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
