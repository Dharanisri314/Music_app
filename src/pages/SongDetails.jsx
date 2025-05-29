import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig";

export default function SongDetails() {
    const { songId } = useParams();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const songRef = ref(database, `songs/${songId}`);
        get(songRef).then((snapshot) => {
            if (snapshot.exists()) {
                setSong(snapshot.val());
            } else {
                setSong(null);
            }
            setLoading(false);
        });
    }, [songId]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (loading) return <p>Loading...</p>;
    if (!song) return <p>Song not found.</p>;

    return (
        <div className="song-details-page">
            <div className="song-container">
                <div className="left-side">
                    <h1 className="song-title">{song.title}</h1>
                    <img src={song.imageUrl} alt={song.title} />
                </div>

                <div className="right-side">
                    <p><strong>Artist:</strong> {song.artist}</p>
                    <p><strong>Category:</strong> {song.category}</p>
                    <p><strong>Release Date:</strong> {song.uploadDate}</p>
                    {song.duration && <p><strong>Duration:</strong> {song.duration}</p>}
                    {song.directorName && <p><strong>Director:</strong> {song.directorName}</p>}
                    {song.description && <p><strong>Description:</strong> {song.description}</p>}

                    <audio ref={audioRef} src={song.audioUrl} onEnded={() => setIsPlaying(false)} />
                    <button onClick={togglePlayPause}>
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            </div>
        </div>


    );
}
