import React, { Component } from 'react';

class StackBoxEntry extends Component {
  render() {
    const { entry, deleteEntry } = this.props;
    return (
      <div>
        <div>{entry.title}</div>
        <button onClick={() => deleteEntry(entry.id)}>삭제</button>
      </div>
    );
  }
}

export default StackBoxEntry;
