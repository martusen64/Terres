import React, {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSectionVisible from "../hooks/useSectionVisible";

const Menu = () => {
    const isInicioVisible = useSectionVisible("Inicio");
    const [showMenu, setShowMenu] = useState(false);

    return(
        <AnimatePresence>
            {!isInicioVisible && (
                <motion.div 
                initial={{opacity:0, x: -100}}
                animate={{opacity:1, x:0}}
                exit={{opacity:0, x: -100}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 z-50">
                    <div className="flex">
                        <div className="w-[50px] h-[50px] lg:w-[63px] lg:h-[63px] bg-black-100 flex overflow-hidden items-center justify-center">
                            <a href="#Inicio" className="cursor-blanco"><img src="Terres-Negro.jpg" alt="logo" className="scale-75" /></a>
                        </div>
                        <div className="w-[50px] h-[50px] lg:w-[63px] lg:h-[63px] bg-white flex items-center justify-center border border-black-100 cursor-negro"
                            onClick={() => setShowMenu(!showMenu)}>
                            <div className="space-y-1">
                                <div className="w-5 h-0.5 bg-black-100"></div>
                                <div className="w-5 h-0.5 bg-black-100"></div>
                                <div className="w-5 h-0.5 bg-black-100"></div>
                            </div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{duration:0.3}} 
                            className="mt-2 w-56 bg-white border border-black p-4">
                                <ul className="space-y-2 text-m font-medium">
                                    <li><a href="#About" className="cursor-negro">¿Quiénes somos?</a></li>
                                    <li><a href="#Proyectos" className="cursor-negro">Proyectos</a></li>
                                    <li><a href="#Clientes" className="cursor-negro">Clientes</a></li>
                                    <li><a href="#Contacto" className="cursor-negro">Contacto</a></li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Menu;