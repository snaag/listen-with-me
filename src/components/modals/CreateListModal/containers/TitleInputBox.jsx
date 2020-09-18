import { connect } from 'react-redux';
import { setListTitle } from '../../../../modules/playList';
import TitleInputBox from '../components/TitleInputBox';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    handleListTitle: list_title => {
      return dispatch(setListTitle({ list_title }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleInputBox);
