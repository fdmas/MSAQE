import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/assets/logo.png" alt="MSAQE Logo" />
          <span>MSAQE</span>
        </div>
        
        <div className="navbar-toggle" onClick={toggleMenu}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        
        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="#introduction" className="navbar-link" onClick={closeMenu}>
              <i className="fas fa-info-circle"></i> 介绍
            </a>
          </li>
          <li className="navbar-item">
            <a href="#dataset" className="navbar-link" onClick={closeMenu}>
              <i className="fas fa-database"></i> 数据集
            </a>
          </li>
          <li className="navbar-item">
            <a href="#ai-model" className="navbar-link" onClick={closeMenu}>
              <i className="fas fa-brain"></i> AI模型
            </a>
          </li>
          <li className="navbar-item">
            <a href="#demo" className="navbar-link" onClick={closeMenu}>
              <i className="fas fa-chart-bar"></i> 演示
            </a>
          </li>
          <li className="navbar-item">
            <a href="#benefits" className="navbar-link" onClick={closeMenu}>
              <i className="fas fa-check-circle"></i> 优势
            </a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link" onClick={closeMenu}>
              <i className="fas fa-envelope"></i> 联系我们
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 