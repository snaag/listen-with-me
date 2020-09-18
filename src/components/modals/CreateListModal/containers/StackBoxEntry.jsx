import { connect } from 'react-redux';
import { setEntries } from '../../../../modules/playList';
import StackBoxEntry from '../components/StackBoxEntry';

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

export default connect(mapStateToProps, mapDispatchToProps)(StackBoxEntry);
