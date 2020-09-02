import { connect } from 'react-redux';
import MusicStackBox from '../components/MusicStackBox';

const mapStateToProps = state => ({
  entries: state.playList.entries,
});

export default connect(mapStateToProps)(MusicStackBox);
