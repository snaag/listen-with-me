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

  render() {
    const { music, handleQuery } = this.props;
    return (
      <div>
        <input onChange={e => handleQuery(e.target.value)}></input>
        <button onClick={() => this.searchMusic()}>검색</button>
        {music.map(entry => (
          <SearchMusicEntry key={entry.id.videoId} entry={entry} />
        ))}
      </div>
    );
  }
}

export default SearchMusic;
