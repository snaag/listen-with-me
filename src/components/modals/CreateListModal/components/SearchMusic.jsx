import React, { Component } from 'react';
import SearchMusicEntry from '../containers/SearchMusicEntry';
import * as api from '../../../../api/youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchMusic extends Component {
  async searchMusic() {
    const { searchInfo, handleMusic } = this.props;

    try {
      const { data } = await api.searchYouTube(searchInfo);
      handleMusic(data.items);
    } catch (err) {
      console.log(err);
    }
  }

  handlePressEnter(key) {
    if (key === 'Enter') {
      this.searchMusic();
    }
  }

  render() {
    const { music, handleQuery } = this.props;
    return (
      <div className="createListModal_content_searchMusic">
        <div className="createListModal_content_searchMusic-searchBox">
          <input
            className="createListModal_content_searchMusic-inputBox"
            onChange={e => handleQuery(e.target.value)}
            onKeyPress={e => this.handlePressEnter(e.key)}
            placeholder="검색"
          ></input>
          <button
            className="createListModal_content_searchMusic-searchButton"
            onClick={() => this.searchMusic()}
          >
            <FontAwesomeIcon icon={['fas', 'search']} />
          </button>
        </div>
        <div className="createListModal_content_searchMusic-entries">
          {music &&
            (music.length ? (
              music.map(entry => (
                <SearchMusicEntry key={entry.id.videoId} entry={entry} />
              ))
            ) : (
              <div className="createListModal_content_searchMusic-noResult">
                검색결과가 없습니다.
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default SearchMusic;
