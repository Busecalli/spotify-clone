import React from 'react';

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="top-bar">
        <div className="navigation-buttons">
          <button className="nav-button">◀</button>
          <button className="nav-button">▶</button>
        </div>
        <div className="tabs">
          <div className="tab active">Tümü</div>
          <div className="tab">Müzik</div>
          <div className="tab">Podcast'ler</div>
        </div>
      </div>
      
      <div className="content">
        <div className="playlists-grid">
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Free</div>
            <div className="playlist-subtitle">Çalma listesi • Hrmsh</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">All</div>
            <div className="playlist-subtitle">Çalma listesi • Hrmsh</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Beğenilen Şarkılar</div>
            <div className="playlist-subtitle">Çalma listesi • 87 şarkı</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Hayatı Seviyorum</div>
            <div className="playlist-subtitle">Çalma listesi • Hrmsh</div>
          </div>
        </div>
        
        <h2>Hrmsh İçin Derlendi</h2>
        <div className="daily-mix-section">
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Daily Mix 1</div>
            <div className="playlist-subtitle">Canozan, No Land, Skepsis ve daha fazlası</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Daily Mix 2</div>
            <div className="playlist-subtitle">Patron, Ezhel, Ados ve daha fazlası</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Daily Mix 3</div>
            <div className="playlist-subtitle">Sabrina Carpenter, Lady Gaga, Doja Cat ve daha fazlası</div>
          </div>
        </div>
        
        <h2>Kaldığın yerden devam et</h2>
        <div className="continue-section">
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">The hottest 50</div>
            <div className="playlist-subtitle">Cover: Lorde</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Billie Eilish</div>
            <div className="playlist-subtitle">Sanatçı</div>
          </div>
          <div className="playlist-card">
            <div className="playlist-image"></div>
            <div className="play-icon">▶</div>
            <div className="playlist-title">Alex Warren</div>
            <div className="playlist-subtitle">Sanatçı</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;