import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import pageContext from './context';
import './App.css';

function App() {

  const { store } = useContext(pageContext)

  const { loadGames, loadPlayer, player, games } = store;


  useEffect(() => {
    console.log('render')
    loadPlayer.request().finally(() => {
      loadGames.request("USD", 'slots');
    });
  }, []);  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
