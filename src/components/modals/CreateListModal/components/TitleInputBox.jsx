import React, { Component } from 'react';

class TitleInputBox extends Component {
  render() {
    const { handleTitle } = this.props;
    return (
      <div>
        <input
          placeholder="제목을 입력해 주세요."
          onFocus={e => (e.target.placeholder = '')}
          onBlur={e => (e.target.placeholder = '제목을 입력해 주세요.')}
          onChange={e => handleTitle('list_title', e.target.value)}
        ></input>
      </div>
    );
  }
}

export default TitleInputBox;
