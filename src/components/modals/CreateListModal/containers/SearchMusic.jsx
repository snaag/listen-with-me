import { connect } from 'react-redux';
import { setMusic, setQuery } from '../../../../modules/playList';
import SearchMusic from '../components/SearchMusic';

const mapStateToProps = state => ({
  music: state.playList.music,
  searchInfo: state.playList.searchInfo,
});

const mapDispatchToProps = dispatch => {
  return {
    handleMusic: music => {
      return dispatch(setMusic({ music }));
    },
    handleQuery: query => {
      return dispatch(setQuery({ query }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMusic);
