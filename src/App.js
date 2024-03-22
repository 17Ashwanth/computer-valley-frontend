import { Route, Routes } from 'react-router-dom';
import './bootstrap.min.css'
import Login from './Components/Login';
import Reg from './Components/Reg';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import { isAuthTokenContext } from './context/ContextShare';
import { useContext } from 'react';

function App() {
  const {isAuthenticated, setIsAuthenticated} = useContext(isAuthTokenContext)
  return (
    <div className="App" style={{overflow:'hidden'}}>

    <Routes>
        <Route path="/reg" element={<Reg/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={isAuthenticated?<Home home/>:<Login/>} />
        <Route path="/adduser" element={<AddUser/>} />
    </Routes>
    
    </div>
  );
}

export default App;
