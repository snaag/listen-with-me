import React, { Component } from 'react';
import StackBoxEntry from '../containers/StackBoxEntry';

class MusicStackBox extends Component {
  render() {
    const { entries } = this.props;
    return (
      <div className="createListModal_content_musicStackBox">
        {entries.map(entry => (
          <StackBoxEntry key={entry.id} entry={entry} />
        ))}
      </div>
    );
  }
}

export default MusicStackBox;
