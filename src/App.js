import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Dataset from './components/Dataset';
import AiModel from './components/AiModel';
import InteractiveDemo from './components/InteractiveDemo';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <main>
        <section id="introduction">
          <Introduction />
        </section>
        <section id="dataset">
          <Dataset />
        </section>
        <section id="ai-model">
          <AiModel />
        </section>
        <section id="demo">
          <InteractiveDemo />
        </section>
        <section id="benefits">
          <Benefits />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App; 