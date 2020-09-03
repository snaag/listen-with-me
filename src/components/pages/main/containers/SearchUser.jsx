import { connect } from 'react-redux';
import { setNickname } from '../../../../modules/main';
import SearchUser from '../components/SearchUser';

const mapStateToProps = state => ({
  nickname: state.main.nickname,
});

const mapDispatchToProps = dispatch => {
  return {
    handleNickname: nickname => {
      return dispatch(setNickname(nickname));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
