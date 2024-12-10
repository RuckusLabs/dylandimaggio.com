import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./video.scss";
import Videos from '../components/Videos';

function Video() {

  const [videos, setVideos] = useState([]);
  const [data, setData] = useState([]);
  const [videoId, setVideoId] = useState();
  const [embedUrl, setEmbedUrl] = useState();

  let { id } = useParams();

  function getVideoId(url) {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  const getVideoEmbedUrl = (url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    } else if (url.includes("vimeo.com")) {
      const regex = /vimeo\.com\/(\d+)/;
      const match = url.match(regex);
      return match ? `https://player.vimeo.com/video/${match[1]}` : null;
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
        setEmbedUrl(getVideoEmbedUrl(matchedData.link));
        setData(matchedData); // Set the profile state with the found data

      })
      .catch((error) => console.error('Error loading profiles:', error));
  }, [id]);

  useEffect(() => {
    // Scroll to the top when videoId changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds a smooth scrolling animation
    });
  }, [videoId]); // Dependency array includes videoId


  return (
    <>
      <div className="video-detail">
        <div className="wrapper">
          <h1>{data.title}</h1>
          <h2>{data.role}</h2>
          {data.description ? <p className="description">{data.description}</p> : ''}
        </div>
        <div className="embed-container">
          <iframe src={embedUrl}></iframe>
        </div>
        <div className="wrapper">
          {data.credits ? <><h4>Credits</h4><ul className="credits"> {data.credits.map((credit) => <li className="credit">{credit}</li>)}</ul></> : ''}
        </div>
      </div>
      <div className="wrapper">
        <div class="intro">
          <h3>More Video Work</h3>
        </div>
        <Videos />
      </div>
    </>
  )
}

export default Video;