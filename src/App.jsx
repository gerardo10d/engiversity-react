import Bienvenida from "./components/Bienvenida/Bienvenida";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Pavimentos from "./components/Pavimentos/Pavimentos";
import Suelos from "./components/Suelos/Suelos";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Bienvenida/>} />
          <Route path="/pavimentos" element={<Pavimentos />} />
          <Route path="/suelos" element={<Suelos />} />
          <Route
            path="*"
            element={<h1>ERROR 404: NO SE ENCONTRÓ LA PÁGINA</h1>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
