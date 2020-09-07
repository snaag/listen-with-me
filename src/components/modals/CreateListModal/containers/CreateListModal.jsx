import { connect } from 'react-redux';
import {
  setIsModalOpen,
  setListTitle,
  setEntries,
  setMusic,
  setQuery,
} from '../../../../modules/playList';
import CreateListModal from '../CreateListModal';

const mapStateToProps = state => ({
  isModalOpen: state.playList.isModalOpen,
  list_title: state.playList.list_title,
  entries: state.playList.entries,
});

const mapDispatchToProps = dispatch => {
  return {
    handleModalOpen: isModalOpen => {
      return dispatch(setIsModalOpen(isModalOpen));
    },
    handleListTitle: list_title => {
      return dispatch(setListTitle(list_title));
    },
    handleEntries: entries => {
      return dispatch(setEntries(entries));
    },
    handleMusic: music => {
      return dispatch(setMusic(music));
    },
    handleQuery: query => {
      return dispatch(setQuery(query));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListModal);
