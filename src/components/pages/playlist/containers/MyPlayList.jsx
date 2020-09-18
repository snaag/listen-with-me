import { connect } from 'react-redux';
import { setMyPlayList } from '../../../../modules/playList';
import MyPlayList from '../components/MyPlayList';

const mapStateToProps = state => ({
  myPlayList: state.playList.myPlayList,
});

const mapDispatchToProps = dispatch => {
  return {
    handleMyPlayList: myPlayList => {
      return dispatch(setMyPlayList({ myPlayList }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPlayList);
