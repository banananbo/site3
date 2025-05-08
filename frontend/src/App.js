import React from 'react';
import './App.css';
import MessageComponent from './components/MessageComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Kotlin + MySQL Demo</h1>
      </header>
      <main>
        <MessageComponent />
      </main>
      <footer className="App-footer">
        <p>Docker Compose Example Project</p>
      </footer>
    </div>
  );
}

export default App; 