import { connect } from 'react-redux';
import { setEntries } from '../../../../modules/playList';
import SearchMusicEntry from '../components/SearchMusicEntry';

const mapStateToProps = state => ({
  entries: state.playList.entries,
});

const mapDispatchToProps = dispatch => {
  return {
    handleEntries: entries => {
      return dispatch(setEntries({ entries }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMusicEntry);
