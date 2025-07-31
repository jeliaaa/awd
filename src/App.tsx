import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { About } from './pages/About';
import Accesebility from './components/Accesebility';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Reports from './pages/Reports';
import Stories from './pages/Stories';
import Calendar from './pages/Calendar';


const App = () => {
  return (
    <div className='relative'>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/reports' element={<Reports/>}/>
          <Route path='/stories' element={<Stories/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          {/* Redirect unknown paths to home */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </main>
      <Accesebility />
    </div>
  );
};

export default App;
