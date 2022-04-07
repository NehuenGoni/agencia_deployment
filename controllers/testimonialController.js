import { Testimonial } from "../server/models/Testimoniaes.js"

const guardarTestimonial = async (req , res) => {
    
    //validar
    const { nombre, correo, mensaje} = req.body

    const errores = []

    if(nombre.trim() === ''){
        errores.push({mensaje: 'el nombre esta vacio'})
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'el correo esta vacio'})
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'el mensaje esta vacio'})
    }
    if(errores.length > 0){
        // consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        //mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo, 
            mensaje,
            testimoniales
        })
    } else {
        // almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales')
        } catch(error) {
            console.log
        }
    }
}

export {
    guardarTestimonial
}