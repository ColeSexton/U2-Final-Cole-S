import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Bio from './components/Bio';
import SongForm from './components/SongForm';
import Generator from './components/Generator';
import Submission from './components/Submission';
import Header from "./components/reuse/Header";


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/Bio' element={<Bio/>}/>
        <Route path='/SongForm' element={<SongForm/>}/>
        <Route path='/Generator' element={<Generator/>}/>
        <Route path='/Submission' element={<Submission/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
