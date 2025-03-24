import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import { Theme, ThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import CreateCard from './components/CreateCard';
import MyCards from './components/MyCards';
import About from './components/About';
import FavouriteCards from './components/FavouriteCards';
import EditCard from './components/EditCard';

function App() {
const [theme, setTheme] = useState<Theme>('light');
const toggleTheme = () => {
setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
};

return (
<>
<ToastContainer />
<ThemeContext.Provider value={{ theme, toggleTheme }}>
<Router>
  <Routes>
    <Route path="/" element={<Navigate  to="/dashboard" replace />} />
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/newcard" element={<CreateCard/>}/>
    <Route path="/mycard" element={<MyCards/>}/>
    <Route path="*" element={<PageNotFound/>} />
    <Route path="/about" element={<About/>}/>
    <Route path="/favourite-cards" element={<FavouriteCards/>}/>
    <Route path="/edit-card/:cardId" element={<EditCard />} />

  </Routes>
</Router>
</ThemeContext.Provider>
</>
);
};

export default App