import React, { Component } from 'react';
import searchYoutube from './SearchYoutube';
import SearchMusicEntry from '../containers/SearchMusicEntry';

class SearchMusic extends Component {
  searchMusic() {
    const { searchInfo, handleMusic } = this.props;
    searchYoutube(searchInfo, data => {
      handleMusic(data);
    });
  }

  handlePressEnter(key) {
    if (key === 'Enter') {
      this.searchMusic();
    }
  }

  render() {
    const { music, handleQuery } = this.props;
    return (
      <>
        <input
          className="createListModal_content_searchMusic-inputBox"
          onChange={e => handleQuery(e.target.value)}
          onKeyPress={e => this.handlePressEnter(e.key)}
        ></input>
        <button
          className="createListModal_content_searchMusic-searchButton"
          onClick={() => this.searchMusic()}
        >
          검색
        </button>
        {music.map(entry => (
          <SearchMusicEntry key={entry.id.videoId} entry={entry} />
        ))}
      </>
    );
  }
}

export default SearchMusic;
