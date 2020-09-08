import { connect } from 'react-redux';
import { setIsModalOpen } from '../../../../modules/playList';
import MainPage from '../MainPage';

const mapStateToProps = state => ({
  isModalOpen: state.playList.isModalOpen,
});

const mapDispatchToProps = dispatch => {
  return {
    handleModalOpen: isModalOpen => {
      return dispatch(setIsModalOpen(isModalOpen));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
