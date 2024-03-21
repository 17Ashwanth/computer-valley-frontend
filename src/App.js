import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css'
import Login from './Components/Login';
import Reg from './Components/Reg';

function App() {
  return (
    <div className="App" style={{overflow:'hidden'}}>

    <Routes>
        <Route path="/reg" element={<Reg/>} />
        <Route path="/" element={<Login/>} />
    </Routes>
    
    </div>
  );
}

export default App;
