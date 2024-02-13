import { Helmet } from "react-helmet";
import imagenPav from "../../assets/img/pavimento-aashto.png";
import { useState } from "react";

const Pavimentos = () => {
  const [nese_, setNese] = useState("");
  const [confiabilidad_, setConfiabilidad] = useState("");
  const [tipoCarretera_, setTipoCarretera] = useState("");
  const [moduloCapa1_, setModuloCapa1] = useState("");
  const [moduloCapa2_, setModuloCapa2] = useState("");
  const [moduloCapa3_, setModuloCapa3] = useState("");
  const [moduloCapa4_, setModuloCapa4] = useState("");
  const [m_, setM] = useState("");
  
  const espesoresCapas = [
    [5, 7.5, 10, 12.5, 13, 14, 15, 16, 17, 18, 19, 20],
    [15, 20, 25, 30],
    [15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
  ];

  // Función para manejar el cambio en el input
  const handleChange = (e, setValue) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  // CLASES
  class CapaPavimento {
    constructor(moduloMpa, m = 1) {
      this.moduloPsi = moduloMpa * 145; // Módulo de elasticidad de la capa en MPa y lo convierte a psi
      this.m = m; // Coeficiente de drenaje
    }

    // Método para resolver una capa de pavimento asfáltico con el método AASHTO-93
    resolverCapa(
      nese,
      zr,
      carreteraGrande,
      capa,
      moduloInfMpa,
      SNcorregidoAnterior = 0
    ) {
      // Método de cálculo del número estrutural (SN) para la capa
      let moduloInfPsi = moduloInfMpa * 145; // Módulo de elasticidad de la capa inferior en MPa y lo convierte a psi
      const tolerancia = 1; // se tolera 1% de error
      let error; // Error porcentual entre la aproximación calculada y la asumida
      let perdidaServ = carreteraGrande ? 1.7 : 2.2; // Pérdida de serviciabilidad del pavimento
      // let i = 0; // Conteo de iteraciones
      let semillaSN = 4.0; // SN semilla asumido para iniciar la iteración actual
      let calcSN; // SN calculado
      const s0 = 0.45; // Error estándar

      do {
        calcSN =
          -1 +
          10 **
            ((Math.log10(nese) +
              zr * s0 -
              2.32 * Math.log10(moduloInfPsi) +
              8.27 -
              Math.log10(perdidaServ / 2.7) /
                (0.4 + 1094 / (semillaSN + 1) ** 5.19)) /
              9.36);
        error = (Math.abs(calcSN - semillaSN) / calcSN) * 100;
        semillaSN = calcSN;
        // i++;
      } while (error > tolerancia); // Las iteraciones terminan cuando el error no sea mayor que la tolerancia

      this.SNe = Math.round(calcSN * 100) / 100; // asigna SNe a calcSN redondeado a dos decimales

      // Calcular el coeficiente estructural de la capa (a)
      let a;
      switch (capa) {
        case 1:
          a =
            Math.round((0.184 * Math.log(this.moduloPsi) - 1.9547) * 100) / 100;
          break;
        case 2:
          a =
            Math.round((0.249 * Math.log10(this.moduloPsi) - 0.977) * 100) /
            100;
          break;
        case 3:
          a =
            Math.round((0.227 * Math.log10(this.moduloPsi) - 0.839) * 100) /
            100;
          break;
      }
      // Cálculo del espesor constructivo de la capa de pavimento
      let dCalcPulg = (this.SNe - SNcorregidoAnterior) / (a * this.m); // Espesor calculado en pulgadas
      let dCalcCm = dCalcPulg * 2.54; // Espesor calculado en centímetros
      this.dCorregidoCm = espesoresCapas[capa - 1].find(
        (el) => el > dCalcCm
      ); // Espesor con redondeo constructivo en centímetros
      let dCorregidoPulg = Math.round((this.dCorregidoCm / 2.54) * 100) / 100; // Espesor anterior en pulgadas con dos decimales
      this.SNcorregido =
        Math.round((SNcorregidoAnterior + a * this.m * dCorregidoPulg) * 100) /
        100; // SN corregido
    }
  }

  // FUNCIONES
  const leerDatosEntrada = () => {
    const desvNormalEstandar = [
      { r: 50.0, zr: 0.0 },
      { r: 60.0, zr: 0.253 },
      { r: 70.0, zr: 0.524 },
      { r: 75.0, zr: 0.674 },
      { r: 80.0, zr: 0.841 },
      { r: 85.0, zr: 1.037 },
      { r: 90.0, zr: 1.282 },
      { r: 95.0, zr: 1.645 },
      { r: 98.0, zr: 2.054 },
      { r: 99.0, zr: 2.327 },
      { r: 99.9, zr: 3.09 },
      { r: 99.99, zr: 3.75 },
    ];

    const nese = parseFloat(nese_) * 1e6;
    const confiabilidad = parseFloat(confiabilidad_);
    const carreteraGrande = tipoCarretera_ === "grande";
    const moduloCapa1 = parseFloat(moduloCapa1_);
    const moduloCapa2 = parseFloat(moduloCapa2_);
    const moduloCapa3 = parseFloat(moduloCapa3_);
    const moduloCapa4 = parseFloat(moduloCapa4_);
    const m = parseFloat(m_);
    const zr = desvNormalEstandar.find((el) => el.r === confiabilidad).zr;

    return [
      moduloCapa1,
      moduloCapa2,
      moduloCapa3,
      moduloCapa4,
      m,
      nese,
      zr,
      carreteraGrande,
      confiabilidad,
    ];
  };

  const crearYresolverCapas = (
    moduloCapa1,
    moduloCapa2,
    moduloCapa3,
    moduloCapa4,
    m,
    nese,
    zr,
    carreteraGrande
  ) => {
    // Crear capas-------------------------------------------------------------------------
    const capas = [
      new CapaPavimento(moduloCapa1),
      new CapaPavimento(moduloCapa2, m),
      new CapaPavimento(moduloCapa3, m),
    ];
    // Resolver capas----------------------------------------------------------------------
    capas[0].resolverCapa(nese, zr, carreteraGrande, 1, moduloCapa2);
    capas[1].resolverCapa(
      nese,
      zr,
      carreteraGrande,
      2,
      moduloCapa3,
      capas[0].SNcorregido
    );
    capas[2].resolverCapa(
      nese,
      zr,
      carreteraGrande,
      3,
      moduloCapa4,
      capas[1].SNcorregido
    );

    return capas;
  };

  const calcular = () => {
    // Lee los datos de entrada con la función y los guarda en un array
    const datosEntradaLeidos = leerDatosEntrada()
    // Obtiene las capas resueltas a partir de los datos leídos y las guarda en un array
    const capas = crearYresolverCapas(...datosEntradaLeidos)
    // el operador ... (spread) entrega los datos por separado del array de datos leídos
    console.log(capas)
  };

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
            rel="noreferrer"
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
            <label htmlFor="nese">N en millones:</label>
            <input
              type="number"
              id="nese"
              min="0.01"
              max="100"
              step="0.01"
              placeholder="Ej: 4.5"
              value={nese_}
              onChange={(e) => handleChange(e, setNese)}
              required
            />
            <label htmlFor="R">Confiabilidad (%):</label>
            <select
              name="confiabilidad"
              id="R"
              value={confiabilidad_}
              onChange={(e) => handleChange(e, setConfiabilidad)}
              required
            >
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
            <label htmlFor="tipoCarretera">Tipo de carretera:</label>
            <select
              name="tipoCarretera"
              id="tipoCarretera"
              value={tipoCarretera_}
              onChange={(e) => handleChange(e, setTipoCarretera)}
              required
            >
              <option value="grande">Grande</option>
              <option value="pequena">Pequeña</option>
            </select>
            <label htmlFor="m">Coeficiente de drenaje:</label>
            <input
              type="number"
              min="0.40"
              max="1.40"
              step="0.05"
              id="m"
              placeholder="Ej: 0.9"
              value={m_}
              onChange={(e) => handleChange(e, setM)}
              required
            />
          </div>
          <div>
            <label htmlFor="modulo1">Módulo de capa asfáltica (MPa):</label>
            <input
              type="number"
              id="modulo1"
              min="1000"
              max="10000"
              step="50"
              placeholder="Ej: 4000"
              value={moduloCapa1_}
              onChange={(e) => handleChange(e, setModuloCapa1)}
              required
            />
            <label htmlFor="modulo2">Módulo de base granular (MPa):</label>
            <input
              type="number"
              id="modulo2"
              min="100"
              max="600"
              step="5"
              placeholder="Ej: 300"
              value={moduloCapa2_}
              onChange={(e) => handleChange(e, setModuloCapa2)}
              required
            />
            <label htmlFor="modulo3">Módulo de subbase granular (MPa):</label>
            <input
              type="number"
              id="modulo3"
              min="100"
              max="600"
              step="5"
              placeholder="Ej: 150"
              value={moduloCapa3_}
              onChange={(e) => handleChange(e, setModuloCapa3)}
              required
            />
            <label htmlFor="modulo4">Módulo de subrasante (MPa):</label>
            <input
              type="number"
              id="modulo4"
              min="10"
              max="100"
              step="1"
              placeholder="Ej: 40"
              value={moduloCapa4_}
              onChange={(e) => handleChange(e, setModuloCapa4)}
              required
            />
          </div>
        </form>
        <div className="botones">
          <button type="button" id="boton-calcular" onClick={() => calcular()}>
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
