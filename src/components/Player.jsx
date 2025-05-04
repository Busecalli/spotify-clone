import React from 'react';

const Player = () => {
  return (
    <div className="player">
      <div className="player-controls">
        <div className="track-info">
          {/* Track info would go here */}
          <div className="now-playing">
            <div className="track-image"></div>
            <div className="track-details">
              <div className="track-name">Current Track</div>
              <div className="artist-name">Artist</div>
            </div>
          </div>
        </div>
        <div className="control-buttons">
          <button>⏮</button>
          <button className="play-button">▶</button>
          <button>⏭</button>
        </div>
        <div className="progress-bar">
          <div className="time">2:00</div>
          <div className="bar"></div>
          <div className="time">3:18</div>
        </div>
      </div>
    </div>
  );
};

export default Player;