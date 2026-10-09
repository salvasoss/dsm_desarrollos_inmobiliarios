import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';
import { WhatsAppProvider } from './components/WhatsAppButton/WhatsAppButton';
import RouteEffects from './components/RouteEffects/RouteEffects';
import Main from './pages/Main/Main';
import EnVenta from './pages/EnVenta/EnVenta';
import EnConstruccion from './pages/EnConstruccion/EnConstruccion';
import Entregados from './pages/Entregados/Entregados';
import Contacto from './pages/Contacto/Contacto';
import NotFound from './pages/NotFound/NotFound';
import DuplexDetailContainer from './components/DuplexDetailContainer/DuplexDetailContainer';

export default function App() {
  function skipToContent(event) {
    event.preventDefault();
    const content = document.getElementById('contenido');
    content?.focus({ preventScroll: true });
    content?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  return (
    <WhatsAppProvider>
      <a className="skip-link" href="#contenido" onClick={skipToContent}>Ir al contenido</a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/en-venta" element={<EnVenta />} />
          <Route path="/en-construccion" element={<EnConstruccion />} />
          <Route path="/entregados" element={<Entregados />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/duplex/:duplexId" element={<DuplexDetailContainer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <RouteEffects />
    </WhatsAppProvider>
  );
}
