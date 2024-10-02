import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "react-toastify/dist/ReactToastify.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  

  return (
    
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
      
  )
}

export default App
