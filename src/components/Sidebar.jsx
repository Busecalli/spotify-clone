import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="logo">Kitaplığın</div>
        <div className="sidebar-menu">
          <div className="menu-item active">Çalma Listeleri</div>
          <div className="menu-item">Podcast'ler</div>
        </div>
        <div className="playlist-list">
          <div className="playlist-item active">
            <div className="playlist-icon">❤️</div>
            <div className="playlist-info">
              <div className="playlist-name">Beğenilen Şarkılar</div>
              <div className="playlist-details">Çalma listesi • 87 şarkı</div>
            </div>
          </div>
          <div className="playlist-item">
            <div className="playlist-icon">🎵</div>
            <div className="playlist-info">
              <div className="playlist-name">Hurricane</div>
              <div className="playlist-details">Çalma listesi • Hrmsh</div>
            </div>
          </div>
          <div className="playlist-item">
            <div className="playlist-icon">🎧</div>
            <div className="playlist-info">
              <div className="playlist-name">All</div>
              <div className="playlist-details">Çalma listesi • Hrmsh</div>
            </div>
          </div>
          <div className="playlist-item">
            <div className="playlist-icon">🎙️</div>
            <div className="playlist-info">
              <div className="playlist-name">Barış Özcan ile 111 Hz</div>
              <div className="playlist-details">Podcast • Podbean Media</div>
            </div>
          </div>
          <div className="playlist-item">
            <div className="playlist-icon">🆓</div>
            <div className="playlist-info">
              <div className="playlist-name">Free</div>
              <div className="playlist-details">Çalma listesi • Hrmsh</div>
            </div>
          </div>
          <div className="playlist-item">
            <div className="playlist-icon">💖</div>
            <div className="playlist-info">
              <div className="playlist-name">Hayatı Seviyorum</div>
              <div className="playlist-details">Çalma listesi • Hrmsh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;