import { motion } from "framer-motion"
import React from "react"
import { client } from "../../sanityClient"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"

const About = () => {
    const [integrantes, setIntegrantes] = useState([])

    useEffect(() => {
        client
            .fetch('*[_type == "integrante"]')
            .then((data) => {
                const formateados = data.map(inte =>({
                    nombre: inte.Nombre,
                    texto: inte.body.map(body =>body.children[0].text)
                }))
                setIntegrantes(formateados)
            })
            .catch(console.error)
    }, [])
    return(
        <section className="relative px-4 pl-5 lg:pl-32 py-2scroll-smooth">
            <motion.span
                initial={{ x: 0, opacity: 0 }}  // Sale de la izquierda
                whileInView={{ x: 0, opacity: 1 }}      // Aparece con opacidad
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="font-bold text-4xl lg:text-5xl"
                style={{display: 'inline-block',
                        paddingBottom:'15px',
                }}>
                    Quiénes somos?
            </motion.span>
            <div className="grid grid-cols-1 items-stretch w-full border-l-[1px] border-black-100">
                <img src="Foto_equipo.jpg" alt="Foto de equipo" className="h-[40vw] lg:h-[25vw] w-full object-cover pl-1" />
                <motion.div className="flex-col items-start justify-start w-full pl-1"
                initial={{ x: 0, opacity: 0 }}  // Sale de la izquierda
                whileInView={{ x: 0, opacity: 1 }}      // Aparece con opacidad
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}>
                    {integrantes.map((integrante, index) => (
                        <div key={index}>
                            <p className="text-m lg:text-2xl font-bold pt-4">{integrante.nombre}</p>
                            {integrante.texto.map((linea, index2) => (
                                <p key={index2} className="text-sm lg:text-xl font-thin">{linea}</p>
                            ))}
                        </div>
                    ))}
                </motion.div>
            
            </div>
        </section>
    )
}

export default About