import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import About from './components/About/About';
import Steps from './components/Steps/Steps';
import WhosFor from './components/WhosFor/WhosFor';
import BecomeClient from './components/BecomeClient/BecomeClient';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import OurClients from './components/OurClients/OurClients';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <WhosFor />
      <Steps />
      <OurClients />
      <BecomeClient />
      <News />
      <Footer />
    </div>
  );
}

export default App;
