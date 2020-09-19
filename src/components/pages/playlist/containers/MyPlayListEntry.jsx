import { connect } from 'react-redux';
import { maintainSignIn } from '../../../../modules/user';
import MyPlayListEntry from '../components/MyPlayListEntry';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    handleSignIn: boolean => {
      return dispatch(maintainSignIn({ boolean }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPlayListEntry);
