import { motion } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react";
import { client } from "../../sanityClient";

const Inicio = () =>{
    const [data, setData] = useState(null)

    useEffect(() => {
        client
            .fetch('*[_type == "post"]')
            .then((res) => setData(res))
            .catch(console.error)
    }, [])

    return(
        <section className="scroll-smooth">
            <div className="relative w-full lg:h-screen h-[170vw]">
                <div className="flex items-baseline absolute bottom-0 right-0">
                    { data ? (
                        <div className="text-xs font-thin lg:font-normal absolute top-4 left-4 z-10 w-40">
                            <p style={{fontSize: '0.95rem'}}>{data[0].body[0].children[0].text}</p>
                        </div>
                     ):(
                        <div className="text-xs absolute top-4 left-4 z-10 w-40">
                            <p style={{fontSize: '0.95rem'}}>cargando...</p>
                        </div>
                     )

                    }
                    <div className="h-[120vw] lg:h-[40vw] border-l-2 border-black-100 mx-1 lg:mx-2"></div>
                    <motion.span 
                        initial={{ y: 100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }} 
                        className="text-[20vw] font-ExpressaThin lg:text-[15vw] text-left origin-left w-full transform">
                            ter
                    </motion.span>
                    <div className="h-[80vw] lg:h-[30vw] border-l-2 border-black-100 ml-3"></div>
                    <motion.span 
                        initial={{ y: 100, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-[20vw] font-Expressa lg:text-[15vw] text-left origin-left font-normal w-full transform">
                            res
                    </motion.span>
                </div>
            </div>
        </section>
    )
}

export default Inicio