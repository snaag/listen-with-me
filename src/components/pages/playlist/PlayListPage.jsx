import React, { Component } from 'react';
import MyPlayList from './components/MyPlayList';
import CreateListModal from '../../modals/CreateListModal/CreateListModal';

class PlayListPage extends Component {
  state = {
    isModalOpen: false,
  };

  handleModalOpen() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <div>
        <div className="myPlayList">
          <MyPlayList />
        </div>
        <button onClick={() => this.handleModalOpen()}>모달</button>
        <div className="createListModal">
          <CreateListModal
            isOpen={this.state.isModalOpen}
            handleModalOpen={this.handleModalOpen.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default PlayListPage;
