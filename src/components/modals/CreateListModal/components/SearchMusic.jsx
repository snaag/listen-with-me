import React, { Component } from 'react';
import searchYoutube from './SearchYoutube';
import SearchMusicEntry from './SearchMusicEntry';

class SearchMusic extends Component {
  state = {
    music: [],
    searchInfo: {
      query: '',
      max: 3,
      key: 'AIzaSyDnWENLbOv2iXF3sZHse_MjnRVrq-g-PBE',
    },
  };

  handleQuery(value) {
    const searchInfo = this.state.searchInfo;
    searchInfo.query = value;
    this.setState({
      searchInfo: searchInfo,
    });
  }

  handleMusic(value) {
    this.setState({
      music: value,
    });
  }

  searchMusic() {
    searchYoutube(this.state.searchInfo, data => {
      this.handleMusic(data);
    });
  }

  render() {
    return (
      <div>
        <input onChange={e => this.handleQuery(e.target.value)}></input>
        <button onClick={e => this.searchMusic()}>검색</button>
        {this.state.music.map(entry => (
          <SearchMusicEntry
            key={entry.id.videoId}
            entry={entry}
            addEntry={this.props.addEntry}
          />
        ))}
      </div>
    );
  }
}

export default SearchMusic;
