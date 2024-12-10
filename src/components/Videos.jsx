import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Videos() {

  const [videos, setVideos] = useState([]);
  const [data, setData] = useState([]);
  const [videoId, setVideoId] = useState();

  let { id } = useParams();

  function getVideoId(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  const getVideoThumbnail = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
    } else if (url.includes("vimeo.com")) {
      const regex = /vimeo\.com\/(\d+)/;
      const match = url.match(regex);
      return match ? `https://vumbnail.com/${match[1]}.jpg` : null;
    }
    return null; // Unsupported platform
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/RuckusLabs/dylandimaggio.com/refs/heads/main/public/video-database.json')
      .then((response) => response.json())
      .then((data) => {

        setVideos(data);
        // Find the profile with the matching id
        const matchedData = data.find((profile) => profile.id === Number(id));

        setVideoId(getVideoId(matchedData.link));
        setData(matchedData); // Set the profile state with the found data

      })
      .catch((error) => console.error('Error loading profiles:', error));
  }, [id]);

  return (
    <div className="videos">
      {videos
        .filter(item => item.id !== data.id)
        .map((item) => (
          <Link className="video-entry" key={item.id} to={`/video/${item.id}`}>
            <img src={getVideoThumbnail(item.link)} alt={item.title} />
            <div className="video-meta">
              <h4>{item.title}</h4>
              <p>{item.role}</p>
            </div>
          </Link>
        ))}
    </div>
  )
}