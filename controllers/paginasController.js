import { Viaje } from '../server/models/Viaje.js'
import { Testimonial } from '../server/models/Testimoniaes.js'

const paginaInicio = async (req, res) => {  //req - lo que enviamos || res - lo que express nos responde
    
    // consultar 3 viajes del modelo viaje

    const promiseDB = []

    promiseDB.push(Viaje.findAll({limit: 3}) )
    promiseDB.push(Testimonial.findAll({limit: 3}))
    try {
        const resultado = await Promise.all(promiseDB) 

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log()
    }

}

const paginaNosotros = (req, res) => { 
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req, res) => { 
    //consultar DB
    const viajes = await Viaje.findAll()

    console.log(viajes)

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    })
}

const paginaTestimoniales = async (req, res) => { 
    
    try{
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error){
        console.log(error)
    }
}

//muestra un viaje por slug 
const paginaDetalleViaje = async (req, res) => { 
    
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug }});

        res.render('viaje', { 
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error){
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}