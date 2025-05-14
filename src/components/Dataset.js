import React from 'react';
import './Dataset.css';

const Dataset = () => {
  const dimensions = [
    { code: 'TT', name: '交通运输' },
    { code: 'Exc', name: '游览' },
    { code: 'TSA', name: '旅游安全' },
    { code: 'Hyg', name: '卫生' },
    { code: 'PT', name: '邮政电信' },
    { code: 'TSH', name: '旅游购物' },
    { code: 'BM', name: '商业管理' },
    { code: 'REP', name: '资源与环境保护' }
  ];

  return (
    <section id="dataset" className="dataset">
      <h2>数据集概览</h2>
      <p>
        MSAQE数据集非常全面，包含超过600万条游客评论和290,000个手动标记的数据点。它涵盖了中国的景区，并分为八个质量维度：
      </p>
      <ul className="dimensions-list">
        {dimensions.map((dimension) => (
          <li key={dimension.code}>
            <span className="dimension-code">{dimension.code}</span>
            <span className="dimension-name">{dimension.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Dataset; 