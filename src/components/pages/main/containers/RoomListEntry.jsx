import { connect } from 'react-redux';
import { maintainSignIn } from '../../../../modules/user';
import RoomListEntry from '../components/RoomListEntry';

const mapStateToProps = state => ({
  myNickname: state.user.info.nickname,
});

const mapDispatchToProps = dispatch => {
  return {
    handleSignIn: boolean => {
      return dispatch(maintainSignIn({ boolean }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomListEntry);
