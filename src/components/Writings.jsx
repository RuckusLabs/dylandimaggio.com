import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Writings() {

  const [writings, setWritings] = useState([]);
  const [data, setData] = useState([]);
  const [writingId, setWritingId] = useState();

  let { id } = useParams();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/RuckusLabs/dylandimaggio.com/refs/heads/main/public/writing-database.json')
      .then((response) => response.json())
      .then((data) => {

        console.log(data);
        setWritings(data);
        const matchedData = data.find((profile) => profile.id === Number(id));

        setWritingId(setWritingId(matchedData.link));
        setData(matchedData);

      })
      .catch((error) => console.error('Error loading profiles:', error));
  }, [id]);

  return (
    <>
      <div className="writing-content-wrapper">
        {writings
          .map((item) => (
            <li key={item.id}>
              <p><span className="publish-date">{item.publishDate}</span></p>
              <h4>{item.title}</h4>
              {item?.content?.split('\n').map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </li>
          ))}
      </div>
    </>
  )
}