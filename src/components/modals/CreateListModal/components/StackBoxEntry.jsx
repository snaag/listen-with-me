import React, { Component } from 'react';

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
      <div>
        <div>{entry.title}</div>
        <button onClick={() => this.deleteEntry(entry.id)}>삭제</button>
      </div>
    );
  }
}

export default StackBoxEntry;
