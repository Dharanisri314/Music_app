import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import '../style/Homepage.css';

export default function Homepage() {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const songsRef = ref(database, "songs");
    onValue(songsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const songsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setSongs(songsArray);
      } else {
        setSongs([]);
      }
    });
  }, []);

  return (
    <>
      {/* Header */}
      <header className="homepage-header">
        <div className="logo">🎶 MusicApp</div>
        <div className="header-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>


      {/* Main Content */}
      <div className="homepage-container">
        <h1>🎵 Song List</h1>
        {songs.length === 0 && <p>No songs found</p>}

        <div className="song-grid">
          {songs.map((song) => (
            <div className="song-card" key={song.id}>
              <img className="song-image" src={song.imageUrl} alt={song.title} />
              <h2 className="song-title">{song.title}</h2>
              <button onClick={() => navigate(`/song/${song.id}`)}>More Details</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


