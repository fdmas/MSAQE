import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <img src={(process.env.NODE_ENV === 'production' ? '/MSAQE' : '') + '/assets/logo.png'} alt="MSAQE Logo" className="logo" />
        <div className="header-text">
          <p className="lab-info">文旅部重点实验室</p>
          <p className="lab-info">复旦大学多媒体智能安全实验室MAS</p>
          <h1>MSAQE: 基于AI的景区质量评估</h1>
          <p className="copyright">本评价作实验研究用，评分由模型生成，仅作参考</p>
        </div>
      </div>
    </header>
  );
};

export default Header; 