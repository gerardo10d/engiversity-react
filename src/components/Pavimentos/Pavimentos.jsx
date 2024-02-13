import { Helmet } from "react-helmet";
import imagenPav from "../../assets/img/pavimento-aashto.png";

const Pavimentos = () => {
  return (
    <main id="main-pavimentos">
      <Helmet>
        <title>Pavimentos</title>
      </Helmet>
      <section className="espesores-constructivos">
        <h1>Diseño de pavimento asfáltico utilizando el Método AASHTO-93</h1>
        <h2>Espesores constructivos de las capas del pavimento</h2>
        <ul>
          <li>
            Para la capa asfáltica (capa 1) los espesores en centímetros pueden
            ser: 5, 7.5, 10, 12.5, 13, 14, 15, 16, 17, 18, 19, 20.
          </li>
          <li>
            Para la base granular (capa 2) los espesores en centímetros pueden
            ser: 15, 20, 25, 30.
          </li>
          <li>
            Para la subbase granular (capa 3) los espesores en centímetros
            pueden ser: 15, 20, 25, 30, 35, 40, 45, 50, 55, 60.
          </li>
        </ul>
        <img src={imagenPav} alt="esquema de pavimento" />
        <p>
          La guía completa del método AASHTO-93 se encuentra{" "}
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1VH4g-RPlbb6BOuhowi4yz0bk4UuHhd0O/view?usp=sharing"
          >
            aquí
          </a>
          .
        </p>
      </section>
      <section className="datos-entrada">
        <h2>Datos de entrada</h2>
        <form>
          <div>
            <label for="nese">N en millones:</label>
            <input
              type="number"
              id="nese"
              min="0.01"
              max="100"
              step="0.01"
              placeholder="Ej: 4.5"
              required
            />
            <label for="R">Confiabilidad (%):</label>
            <select name="confiabilidad" id="R" required>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="75">75</option>
              <option value="80">80</option>
              <option value="85">85</option>
              <option value="90">90</option>
              <option value="95">95</option>
              <option value="98">98</option>
              <option value="99">99</option>
              <option value="99.9">99.9</option>
              <option value="99.99">99.99</option>
            </select>
            <label for="tipoCarretera">Tipo de carretera:</label>
            <select name="tipoCarretera" id="tipoCarretera" required>
              <option value="grande">Grande</option>
              <option value="pequena">Pequeña</option>
            </select>
            <label for="m">Coeficiente de drenaje:</label>
            <input
              type="number"
              min="0.40"
              max="1.40"
              step="0.05"
              id="m"
              placeholder="Ej: 0.9"
              required
            />
          </div>
          <div>
            <label for="modulo1">Módulo de capa asfáltica (MPa):</label>
            <input
              type="number"
              id="modulo1"
              min="1000"
              max="10000"
              step="50"
              placeholder="Ej: 4000"
              required
            />
            <label for="modulo2">Módulo de base granular (MPa):</label>
            <input
              type="number"
              id="modulo2"
              min="100"
              max="600"
              step="5"
              placeholder="Ej: 300"
              required
            />
            <label for="modulo3">Módulo de subbase granular (MPa):</label>
            <input
              type="number"
              id="modulo3"
              min="100"
              max="600"
              step="5"
              placeholder="Ej: 150"
              required
            />
            <label for="modulo4">Módulo de subrasante (MPa):</label>
            <input
              type="number"
              id="modulo4"
              min="10"
              max="100"
              step="1"
              placeholder="Ej: 40"
              required
            />
          </div>
        </form>
        <div className="botones">
          <button type="button" id="boton-calcular">
            Calcular
          </button>
          <button type="button" id="boton-recuperar">
            Recuperar último
          </button>
        </div>
      </section>
      <section className="resultados">
        <h2>Resultados</h2>
        {/* <p>Aquí se visualizan los resultados de cada capa.</p> */}
        <div className="grid-container"></div>
      </section>
    </main>
  );
};

export default Pavimentos;
