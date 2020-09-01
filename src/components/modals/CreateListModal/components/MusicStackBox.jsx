import React, { Component } from 'react';
import StackBoxEntry from './StackBoxEntry';

class MusicStackBox extends Component {
  render() {
    const { entries, deleteEntry } = this.props;
    return (
      <div>
        {entries.map(entry => (
          <StackBoxEntry
            key={entry.id}
            entry={entry}
            deleteEntry={deleteEntry}
          />
        ))}
      </div>
    );
  }
}

export default MusicStackBox;
