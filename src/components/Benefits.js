import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    '准确的实时质量评估',
    '识别需要改进的领域',
    '增强资源分配的决策能力',
    '提高游客满意度'
  ];

  return (
    <section id="benefits" className="benefits">
      <h2>对政府用户的好处</h2>
      <ul className="benefits-list">
        {benefits.map((benefit, index) => (
          <li key={index} className="benefit-item">
            <span className="benefit-icon">✓</span>
            <span className="benefit-text">{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Benefits; 