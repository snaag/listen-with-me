import React, { Component } from 'react';
import TitleInputBox from './components/TitleInputBox';
import MusicStackBox from './components/MusicStackBox';
import SearchMusic from './components/SearchMusic';
import './CreateListModal.css';

class CreateListModal extends Component {
  state = {
    list_title: '',
    entries: [],
  };

  // [ {title : “string”, artist : “string”, musicURL : “url”, thumbnail : "url" }, ... ]

  handleTitle(key, value) {
    this.setState({
      [key]: value,
    });
  }

  addEntry(value) {
    const { entries } = this.state;
    const newEntries = entries;
    value.id = entries.length ? entries[entries.length - 1].id + 1 : 1;
    newEntries.push(value);
    this.setState({
      entries: newEntries,
    });
  }

  deleteEntry(id) {
    const entries = this.state.entries.filter(entry => {
      if (entry.id !== id) {
        return entry;
      }
    });
    this.setState({
      entries: entries,
    });
  }

  closeModal() {
    if (this.state.list_title || this.state.entries.length) {
      if (window.confirm('play list 작성을 취소하시 겠습니까')) {
        this.setState({
          entries: [],
        });
        this.props.handleModalOpen();
      }
    } else {
      this.props.handleModalOpen();
    }
  }

  createList() {
    // fetch('/playlist', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     list_title: this.state.list_title,
    //     entries: this.state.entries,
    //   }),
    //   credentials: 'include',
    // })
    //   .then(res => {
    //     if (res.status === 202) {
    //       alert('play list가 생성 되었습니다.');
    //      this.setState({
    //        entries: [],
    //      });
    //       this.props.handleModalOpen();
    //     }
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    const { isOpen, handleModalOpen } = this.props;
    return (
      <React.Fragment>
        {isOpen ? (
          <React.Fragment>
            <div
              className="createListModal_overlay"
              onClick={() => this.closeModal()}
            />
            <div className="createListModal_content">
              <TitleInputBox handleTitle={this.handleTitle.bind(this)} />
              <MusicStackBox
                entries={this.state.entries}
                deleteEntry={this.deleteEntry.bind(this)}
              />
              <SearchMusic addEntry={this.addEntry.bind(this)} />
              <div>
                <button onClick={() => this.createList()}> 확인 </button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default CreateListModal;
