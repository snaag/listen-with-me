import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class StackBoxEntry extends Component {
  deleteEntry(id) {
    const { entries, handleEntries } = this.props;
    const newEntries = entries.filter(entry => {
      if (entry.id !== id) {
        return entry;
      }
    });
    handleEntries(newEntries);
  }

  render() {
    const { entry } = this.props;
    return (
      <div className="createListModal_content_musicStackBox-entry">
        <div className="createListModal_content_musicStackBox-entry-title">
          {entry.title}
        </div>
        <button
          className="createListModal_content_musicStackBox-entry-deleteEntryButton"
          onClick={() => this.deleteEntry(entry.id)}
        >
          <FontAwesomeIcon className="minusButton" icon={['fas', 'minus']} />
        </button>
      </div>
    );
  }
}

export default StackBoxEntry;
