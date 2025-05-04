import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Writings() {
  const [writings, setWritings] = useState([]);
  const [groupedWritings, setGroupedWritings] = useState({});

  let { id } = useParams();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/RuckusLabs/dylandimaggio.com/refs/heads/main/public/writing-database.json')
      .then((response) => response.json())
      .then((data) => {
        setWritings(data);
        
        // Group writings by category
        const grouped = data.reduce((acc, item) => {
          const category = item.category || 'Other';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(item);
          return acc;
        }, {});
        
        setGroupedWritings(grouped);
      })
      .catch((error) => console.error('Error loading profiles:', error));
  }, []);

  // Sort categories with "Other" at the end
  const sortedCategories = Object.entries(groupedWritings).sort(([categoryA], [categoryB]) => {
    if (categoryA === 'Other') return 1;
    if (categoryB === 'Other') return -1;
    return categoryA.localeCompare(categoryB);
  });

  return (
    <div className="writing-content-wrapper">
      {sortedCategories.map(([category, items]) => (
        <section key={category} className="category-section">
          <div className="intro">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          </div>
          <ul className="writings-list">
            {items.map((item) => (
              <li key={item.id} className="writing-item">
                <p><span className="publish-date">{item.publishDate}</span></p>
                <h4>{item.title}</h4>
                {item.genre && <h5>{item.genre}</h5>}
                {item.logline && <p>{item.logline}</p>}
                {item?.content?.split('\n').map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}