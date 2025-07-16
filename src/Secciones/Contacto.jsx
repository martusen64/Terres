import emailjs from "@emailjs/browser";
import React , {useRef, useState} from "react"
import { motion } from "framer-motion";

const Contacto = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nombre:'',
        email:'',
        mensaje:''
    })

    const handleChange = ({ target: {name,value}}) => {
        setForm({...form, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try{
            await emailjs.send('service_dsjmwsk',
                'template_3n8wqvg',
                {
                    from_name: form.nombre,
                    to_name: 'Martí',
                    from_email: form.email,
                    to_email: 'martihernandezmartinez@gmail.com',
                    message: form.mensaje
                },
                'Eg4AmLLcj1ZPyFXcb'
                )

                setLoading(false);
                setForm({
                    nombre: '',
                    email: '',
                    mensaje: ''
                });
        } catch(error){
            setLoading(false);
            console.log(error);
            alert('Ups, algo ha fallado...')
        }
        
        //service_dsjmwsk
    }
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
                     Contáctanos:
            </motion.span>
                <div className="border-l-[1px] border-black-100">
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-7 pl-1">
                        <div>
                            <p className="text-xl font-bold pb-1">Nombre Completo</p>
                            <input 
                                type="text"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-transparent border border-black-100"
                                placeholder="Juan Diego (John Doe)"
                            />
                        </div>
                        <div>
                            <p className="text-xl font-bold pb-1">Correo Electrónico</p>
                            <input 
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 bg-transparent border border-black-100"
                                placeholder="juandiego@gmail.com"
                            />
                        </div>
                        <div>
                            <p className="text-xl font-bold pb-1">Mensaje</p>
                            <textarea 
                                type="text"
                                name="mensaje"
                                value={form.mensaje}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full p-2 bg-transparent border border-black-100"
                                placeholder="..."
                            />
                        </div>
                        <button className="bg-transparent border border-black-100 font-bold" type="submit" disabled={loading}>   
                            {loading ? 'Enviando...' : 'Enviar mensaje'}
                        </button>
                    </form>
                </div>
        </section>
    )
}

export default Contacto