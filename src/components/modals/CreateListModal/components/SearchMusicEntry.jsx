import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchMusicEntry extends Component {
  state = {
    entry: {
      title: '',
      artist: '',
      musicURL: '',
      thumbnail: '',
    },
  };

  addEntry(value) {
    const { entries, handleEntries } = this.props;
    const newEntries = entries.slice();
    const newValue = Object.assign({}, value);
    newValue.id = entries.length ? entries[entries.length - 1].id + 1 : 1;
    newValue.title = this.state.entry.title.slice(0, 35) + ' ...';
    newEntries.push(newValue);
    handleEntries(newEntries);
  }

  componentDidMount() {
    const {
      id: { videoId },
      snippet: {
        title,
        channelTitle,
        thumbnails: {
          default: { url },
        },
      },
    } = this.props.entry;

    this.setState({
      entry: {
        title: title,
        artist: channelTitle,
        musicURL: `https://www.youtube.com/embed/${videoId}`,
        thumbnail: url,
      },
    });
  }

  render() {
    return (
      <div className="createListModal_content_searchMusic-entry">
        <img
          className="createListModal_content_searchMusic-entry-thumbnail"
          src={this.state.entry.thumbnail}
          alt=""
        />
        <div className="createListModal_content_searchMusic-entry-title">
          {this.state.entry.title}
        </div>
        <button
          className="createListModal_content_searchMusic-entry-addEntryButton"
          onClick={() => this.addEntry(this.state.entry)}
        >
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </button>
      </div>
    );
  }
}

export default SearchMusicEntry;
