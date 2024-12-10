import { useState, useEffect } from "react";
import "./nav.scss";
import { Link } from "react-router-dom";

const heading1 = "Dylan DiMaggio";
const heading2 = "Independent writer, producer, and editor.";
const menuItems = ["Videos", "Writing", "About"];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
      document.querySelector('nav button').classList.add('active');
    } else {
      document.body.classList.remove("no-scroll");
      document.querySelector('nav button').classList.remove('active');
    }

    // Cleanup in case component unmounts
    return () => document.body.classList.remove("no-scroll");
  }, [isMenuOpen]);

  return (
    <nav className="wrapper">
      <div className="meta">
        <Link to="/">
          <h1>{heading1}</h1>
        </Link>
        <h2>{heading2}</h2>
      </div>
      <button
        onClick={toggleMenu}
        className="menu-button"
        aria-label="Toggle menu"
      >
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.25 0.75H0.75V2.25H13.25V0.75ZM13.25 4.75H0.75V6.25H13.25V4.75ZM13.25 8.75H0.75V10.25H13.25V8.75Z"
            fill="black"
          />
        </svg>
        Menu
      </button>
      <ul
        className={`menu-items ${isMenuOpen ? 'active' : ""}`}
      >
        {menuItems.map((item) => (
          <Link to={item.toLowerCase()} key={item} onClick={closeMenu}>
            <li>{item}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}