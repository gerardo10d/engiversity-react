import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<h3>Bienvenidos</h3>} />
          <Route path="/pavimentos" element={<h4>Pavimentos</h4>} />
          <Route path="/hidraulica" element={<h4>Hidráulica</h4>} />
          <Route
            path="*"
            element={<h1>ERROR 404: NO SE ENCONTRÓ LA PÁGINA</h1>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
