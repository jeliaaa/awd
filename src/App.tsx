import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { About } from './pages/About';
import Accesebility from './components/Accesebility';

const Home = () => <h1>Home Page</h1>;

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Redirect unknown paths to home */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </main>
      <Accesebility />
    </div>
  );
};

export default App;
