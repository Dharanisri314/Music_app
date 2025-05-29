import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { database } from "./firebaseConfig";
import '../style/AdminUpload.css';

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [duration, setDuration] = useState("");
  const [directorName, setDirectorName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !audioUrl || !imageUrl || !category || !uploadDate || !directorName) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const songsRef = ref(database, "songs");
      const newSongRef = push(songsRef);
      await set(newSongRef, {
        title,
        artist,
        audioUrl,
        imageUrl,
        category,
        uploadDate,
        duration,
        directorName,
      });

      alert("Song details saved successfully!");

      // Reset all fields
      setTitle("");
      setArtist("");
      setAudioUrl("");
      setImageUrl("");
      setCategory("");
      setUploadDate("");
      setDuration("");
      setDirectorName("");
      e.target.reset();
    } catch (error) {
      alert("Error saving song: " + error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Upload Song Using URLs</h2>

        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Audio File URL"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image File URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Melody">Melody</option>
          <option value="Love">Love</option>
          <option value="Dance">Dance</option>
          <option value="Devotional">Devotional</option>
          <option value="Folk">Folk</option>
          <option value="Sad">Sad</option>
        </select>

        <input
          type="date"
          placeholder="Upload Date"
          value={uploadDate}
          onChange={(e) => setUploadDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Duration (e.g., 3:45)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          type="text"
          placeholder="Director Name"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
