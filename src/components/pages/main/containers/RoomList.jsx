import { connect } from 'react-redux';
import { setLikedList } from '../../../../modules/main';
import RoomList from '../components/RoomList';

const mapStateToProps = state => ({
  likedList: state.main.likedList,
  isSignIn: state.user.status.isSignIn,
  nickname: state.user.info.nickname,
});

const mapDispatchToProps = dispatch => {
  return {
    handleLikedList: likedList => {
      return dispatch(setLikedList({ likedList }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomList);
