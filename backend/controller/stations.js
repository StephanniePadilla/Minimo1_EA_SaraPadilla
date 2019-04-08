'use strict'

const Station = require('../modelos/stations')
const Bike = require('../modelos/bikes')

//FUNCIONES

//crear nueva ESTACION --POST--
async function saveAsignatura(req, res) {
    console.log('Station Name', req.body.name);
    const station = new Station();
    station.name = req.body.name;
    station.state = req.body.state;
    station.description = req.body.description;
    console.log(station);

    try {
        await station.save();
        res.status(200).send({station}).send({message: "Station created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

//listado de estaciones --GET--
async function getAsignaturas(req, res) {
    try {
        let stations = await Station.find().select({bikes: 0});
        res.status(200).send(stations);
    } catch(err) {
        res.status(500).send(err).send( `Error al realizar la petición a ala base de datos: ${err} `)
    }
}

//Añade bici a estacion si esta NO esta asignada --POST--
async function addAlumno(req, res) {
    try{
        const bikeId = req.body.alumnoId;
        const stationId = req.body.asignaturaId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let bikeFound = await Bike.findById(bikeId);

        if (!bikeFound) {
            return res.status(404).send({message: 'Bike not found'})
        } else if (bikeFound.assigned === true) {
            return res.status(500).send({message: 'Bike is assigned to another station'})
        }
        else {
            let stationUpdated = await Station.findOneAndUpdate({_id: stationId}, {$addToSet: {bikes: bikeId}});
            if (!stationUpdated) {
                return res.status(404).send({message: 'Station not found'})
            }
            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "true"});
            console.log(bikeUpdated);
        }
        res.status(200).send({message: "Bike added successfully to the station"})
    } catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}


//listar bicis de una estacion --GET--
async function getAlumnosdeAsignatura(req, res) {
    try {
        const _id = req.params.stationId;

        //We use populate to return the detail of every bike
        //Populates automatically find every bike that has the specified ID, instead of doing by us
        let station = await Station.findById(_id).populate('bikes');
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            res.status(200).send(station)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

//Eliminar bicis de una estacion en concreto --DELETE--
async function deleteBikeStation(req,res) {
    try{
        const stationId = req.params.stationId;
        const bikeId = req.params.bikeId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);

        let station = await Station.findById(stationId);
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            mongoose.Types.ObjectId(bikeId);

            let stationUpdated = await Station.update({_id: stationId}, {$pull: {bikes: bikeId}});

            if (stationUpdated.nModified === 0) {
                return res.status(404).send({message: 'Bike not found'})
            }

            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {assigned: "false"});
            console.log(bikeUpdated);
        }
        res.status(200).send({message:'Bike deleted successfully'});
    }catch(err){
        res.status(500).send(err)
    }
}

/*//añadir un alumno (ya existente) a una asignatura
function addAlumno (req, res) {
    let asignaturaId = req.params.asignaturaId
    console.log(req.params.asignaturaId)
    let alumnoId = req.params.alumnoId
    console.log(req.params.alumnoId)

    Station.update({_id: asignaturaId}, {"$push": {"alumnos": alumnoId}}, (err, result) => {
        console.log(result)
        if(err) res.status(500).send(`Error al actualizar la asignatura: ${err}`)
        if(!result) return res.status(404).send('La asignatura no esta en la bbdd')

        res.status(200).send(result)
    })

}*/

/*function getAlumnosdeAsignatura(req, res) {
    let asignaturaId = req.params.asignaturaId

    Station.findById({_id: asignaturaId}, (err, result) => {
        console.log(result.alumnos)
        //console.log(alumnos)
        if(err) return res.status(500).send(`Error al realizar la petición: ${err} `)

        return res.status(200).send(result.alumnos)
        /*var arraydeIds = result.alumnos
        console.log(arraydeIds)
        arraydeIds.forEach(element => {
            console.log(element)
            Bike.findById({_id: element}, (err, alumnos) => {
                if(err) return res.status(500).send(`Error al realizar la petición: ${err} `)

                return res.status(200).send(element)
            })
        });
        //Bike.findById({_id: result.alumnos}, (err, alumnos) => {

        //})
    })
}*/

//listado de asignaturas con estudiantes
function getAsignaturasconalumnos(req, res) {
    //busca todos los usuarios, claudator vacio
    Station.find({ }, (err, asignaturasconalumnos) => { //l'array de productes no m'ho dona
        Bike.populate(asignaturasconalumnos, {path: "alumno"}, (err, asignaturasconalumnos) =>{
            if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if (!asignaturasconalumnos) return res.status(404).send({message: 'No existen asignaturas en la bbdd'})
            //se envia una respuesta en res, la respuesta sera un json de producto
            console.log(asignaturasconalumnos)
            //res.send(200, { userList })
            res.status(200).send(asignaturasconalumnos)
        })

    })
}


//detalle de las asignaturas una por una
function getAsignatura(req, res) {
    let asignaturaId = req.params.asignaturaId
    Station.findById(asignaturaId,(err, asignatura) => {
        if (err) return res.status(500).send(`Error al realizar la petición: ${err} `)
        if (!asignatura) return res.status(404).send(`La asignatura no existe`)
        res.status(200).send({ asignatura })
    })
}

//ver alumno que pertenece a una asignatura
function getAlumno(req, res) {
    let alumnoId = req.params.alumnoId
    Station.findById(alumnoId, (err, alumno) => {
        if (err) return res.status(500).send(`Error al realizar la petición: ${err} `)
        if (!alumno) return res.status(404).send(`el alumno no esta en la asignatura`)
        res.status(200).send({alumno})
    })
}

module.exports = {
    getAsignaturasconalumnos,
    saveAsignatura,
    getAsignaturas,
    getAsignatura,
    getAlumno,
    getAlumnosdeAsignatura,
    addAlumno,
    deleteBikeStation
}