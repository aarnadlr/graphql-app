import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Card from './components/Card';

function Home() {
  return (
    <>
      <main className="container">
        <h1>Sorare Homepage</h1>

        <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
          Click below to visit the Marco Verratti cards page
        </p>

        <Link
          style={{ margin: '48px' }}
          to="/cards/marco-verratti-2021-unique-1,marco-verratti-2021-rare-1,marco-verratti-2021-rare-2"
        >
          <button>Go to Marco Verratti cards page</button>
        </Link>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/cards/:slug" element={<Card />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
