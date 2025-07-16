import { motion } from "framer-motion"
import React from "react"
import Inicio from './Secciones/Inicio'
import Proyectos from "./Secciones/Proyectos"
import About from "./Secciones/About"
import Menu from "./Secciones/Menu"
import Clientes from "./Secciones/Clientes"
import Contacto from "./Secciones/Contacto"

const App = () => {
  return (
    <main>
      <script src="https://c.webfontfree.com/c.js?f=Expressa-Bold" type="text/javascript"></script>
      <div>
        <Menu />
      </div>
      <div id='Inicio'>
        <Inicio />
      </div>
      <div className="pb-8" id="About">
        <About />
      </div>
      <div className="py-8" id='Proyectos'>
        <Proyectos />
      </div>
      <div className="py-8" id='Clientes'>
        <Clientes />
      </div>
      <div className="py-8" id='Contacto'>
        <Contacto />
      </div>
    </main>
  )
}

export default App