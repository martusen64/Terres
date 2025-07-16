import {motion, useTransform, useScroll} from "framer-motion";
import React, {useRef, useEffect, useState} from "react"
import { client } from "../../sanityClient";
import imageUrlBuilder from '@sanity/image-url';

const Proyectos = () =>{
    const scrollRef = useRef(null);
    const itemRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const isMobile = window.innerWidth <= 768;

    const builder = imageUrlBuilder(client)

    function urlFor(source){
      return builder.image(source)
    }

    const [proyectos, setProyectos] = useState([])
    
    useEffect(() => {
     client
      .fetch('*[_type == "proyecto"]')
      .then((data) => {
        const formateados = data.map(proy =>({
          titulo: proy.Titulo,
          imagen: urlFor(proy.Imagen).url(),
        }))
        setProyectos(formateados)
      })
      .catch(console.error)
    }, [])


    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
    
        const handleWheel = (e) => {
          e.preventDefault();
          const scrollSpeed = 2;
          container.scrollLeft += e.deltaY * scrollSpeed;
        };
    
        const handleScroll = () => {
          if (!itemRefs.current.length) return;
    
          const scrollLeft = container.scrollLeft;
    
          // Buscar la imagen cuyo centro esté más cerca del borde izquierdo
          let minDistance = Infinity;
          let closestIndex = 0;
    
          itemRefs.current.forEach((item, index) => {
            if (item) {
              const itemLeft = item.offsetLeft;
              const distance = Math.abs(scrollLeft - itemLeft);
    
              const adjustedDistance = isMobile ? distance : distance - 700;
    
              if (adjustedDistance < minDistance) {
                minDistance = adjustedDistance;
                closestIndex = index;
              }
            }
          });
    
          setActiveIndex(closestIndex);
        };
    
        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("scroll", handleScroll);
    
        return () => {
          container.removeEventListener("wheel", handleWheel);
          container.removeEventListener("scroll", handleScroll);
        };
      }, []);

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
              Proyectos:
            </motion.span>
            <motion.div
            ref={scrollRef}
            className="overflow-x-auto flex space-x-2 px-0 hide-scrollbar border-l-[1px] border-black-100 cursor-blanco"
            initial={{ opacity: 0, y: 50 }}   // desde opacidad 0 y bajado 50px
            whileInView={{ opacity: 1, y: 0 }} // cuando entra en pantalla
            transition={{ duration: 0.8, ease: "easeOut" }} //duración de la animación
            viewport={{ once: false, amount: 0.2 }} //solo animar la primera vez y cuando esté 30% visible
            >
                {proyectos.map((proyecto, index) => (
                    <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="w-[85vw] lg:w-[35vw] overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out pl-1"
                  >
                    <img
                      src={proyecto.imagen}
                      alt={`Imagen ${index + 1}`}
                      className={`w-full  
                                    object-cover
                                    transition-all 
                                    duration-300 
                                    ease-in-out
                                    lg:h-[20vw]
                                    h-[50vw]
                                    ${isMobile 
                                    ? activeIndex === index 
                                        ? 'blur-0' 
                                        : 'blur-sm' 
                                    : 'blur-sm hover:blur-0'
                                }`}
                    />
                    <motion.div
                      className="mt-2 text-black-100 font-light text-lg"
                      initial={{ opacity: 0, y: 20 }} // animación desde opacidad 0 y bajado
                      whileInView={{ opacity: 1, y: 0 }} // cuando entra en pantalla
                      transition={{ duration: 0.6, ease: "easeOut" }} //duración de la animación
                    >
                      <h3>{proyecto.titulo}</h3>
                    </motion.div>
                  </div>
                ))}
            </motion.div>

        </section>
    );
};
export default Proyectos