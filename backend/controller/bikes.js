'use strict'
const Alumno = require('../modelos/bikes')

//FUNCIONES

//crear nueva bici --POST--
async function saveAlumno(req, res) {
    const bike = new Alumno();
    bike.name = req.body.name;
    bike.kms = req.body.kms;
    bike.description = req.body.description;
    bike.assigned = req.body.assigned;

    console.log(bike);

    try {
        await bike.save();
        res.status(200).send({message: "Bike created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

//listar todas las bicis --GET--
async function listarAlumnos(req, res) {
    try {
        let bikes = await Alumno.find();
        res.status(200).send(bikes);
    } catch(err) {
        res.status(500).send({message: `Error al realizar la petición: ${err}`})
    }
}


// buscar bici unica por id NO ASIGNADA --GET--
async function getAlumnobyId(req, res) {
    try {
        let unassignedBikes = await Alumno.find({assigned: "false"});
        res.status(200).send(unassignedBikes);
    } catch(err) {
        res.status(500).send(err)
    }
}




//modificar alumno
function updateAlumno (req, res){
    let alumnoId = req.params.alumnoId
    let update = req.body
    Alumno.findByIdAndUpdate(alumnoId, update, (err, alumno) => {
        if (err) res.status(500).send(`Error al actualizarlo: ${err}`)
        if (!alumno) return res.status(404).send({message: 'La asignatura no existe'})

        res.status(200).send(alumno)
    })
}

//eliminar alumno
function deleteAlumno (req, res){
    let alumnoId = req.params.alumnoId
    Alumno.findById(alumnoId, (err, alumno) => {
        if (err) res.status(500).send( `Error al eliminarlo: ${err}`)
    
        alumno.remove(err => {
            if (err) res.status(500).send( `Error al eliminarlo: ${err}`)
            
            res.status(200).send( `alumno eliminado`)
        })
    })
}

async function getUnassignedBikes(req, res) {
    try {
        let unassignedBikes = await Alumno.find({assigned: "false"});
        res.status(200).send(unassignedBikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

module.exports = {
    listarAlumnos,
    saveAlumno,
    getAlumnobyId,
    updateAlumno,
    deleteAlumno,
    getUnassignedBikes
}