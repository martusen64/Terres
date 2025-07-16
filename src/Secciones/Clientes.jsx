import React, {useEffect, useState} from "react";
import { client } from "../../sanityClient";
import imageUrlBuilder from '@sanity/image-url';
import { motion } from "framer-motion";

const Clientes = () => {
    
    const builder = imageUrlBuilder(client)

    function urlFor(source){
        return builder.image(source)
    }

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        client
            .fetch('*[_type == "cliente"]')
            .then((data) => {
                const formateados = data.map(clien =>({
                    nombre: clien.Nombre,
                    imagen: urlFor(clien.Imagen).url(),
                }))
                setClientes(formateados)
            })
            .catch(console.error)
    }, [])
    
    return(
        <section className="px-4 pl-5 lg:pl-32">
            <motion.span
                initial={{ x: 0, opacity: 0 }}  // Sale de la izquierda
                whileInView={{ x: 0, opacity: 1 }}      // Aparece con opacidad
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
                className="font-bold text-4xl lg:text-5xl"
                style={{display: 'inline-block',
                        paddingBottom:'15px',
                }}>
                     Clientes:
            </motion.span>
            <div className="border-l-[1px] border-black-100">
                <div className="grid grid-cols-3 gap-4 pl-1">
                    
                    {clientes.map((cliente, index) => (
                        <div key={index} className="relative group overflow-hidden ">
                            <img src={cliente.imagen} className="w-full h-auto transition duration-300 ease-in-out group-hover:blur-sm"/>
                            <div className="absolute inset-0 flex items-center bg-white bg-opacity-30 lg:bg-opacity-20 justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-negro">
                                <p className="text-xl lg:text-3xl font-thin text-black">{cliente.nombre}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Clientes