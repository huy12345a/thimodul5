import React from 'react';
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import EditSong from './components/EditSong';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<SongList/>} />
          <Route path="/add" element={<AddSong />} />
          <Route path="/edit/:id" element={<EditSong />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
