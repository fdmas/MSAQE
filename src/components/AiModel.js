import React from 'react';
import './AiModel.css';

const AiModel = () => {
  const steps = [
    {
      title: '数据收集',
      description: '从各种来源收集游客评论。'
    },
    {
      title: '预处理',
      description: '清理评论并准备进行分析。'
    },
    {
      title: '分析',
      description: '使用RBSA确定每条评论的情感，并使用GLEE将评论分类到质量维度。'
    },
    {
      title: '评分',
      description: '根据分析结果计算每个维度的分数。'
    }
  ];

  return (
    <section id="ai-model" className="ai-model">
      <h2>AI评估模型</h2>
      <h3>工作原理</h3>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiModel; 