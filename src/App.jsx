import ScrollToTop from './ScrolltoTop';
import { Routes, Route } from 'react-router-dom';
import Loggin from './assets/Loggin/Loggin';
import Home from './assets/Home/Home';
import Register from './assets/Register/Register';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Loggin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
