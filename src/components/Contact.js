import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2>联系我们</h2>
      <p>
        如需更多信息或申请访问MSAQE系统，
        请联系我们：{' '}
        <a href="mailto:msaqe@fudan.edu.cn">msaqe@fudan.edu.cn</a>
      </p>
    </section>
  );
};

export default Contact; 