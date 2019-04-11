'use strict'

const express = require('express')
const asignaturaCtrl = require('../controller/stations')
const alumnoCtrl = require('../controller/bikes')
const api = express.Router()


//ALUMNOS: http://localhost:3000/api/alumno
// crear alumno - FUNCIONA
api.post('/alumno/nuevo', alumnoCtrl.saveAlumno)
//listar alumnos - FUNCIONA
api.get('/alumno/listaAlumnos', alumnoCtrl.listarAlumnos)
//detalle alumno - FUNCIONA
api.get('/alumno/:alumnoId', alumnoCtrl.getAlumnobyId)
//modificar alumno - FUNCIONA
api.put('/alumno/modificar/:alumnoId', alumnoCtrl.updateAlumno)
//eliminar alumno - FUNCIONA
api.delete('/alumno/eliminar/:alumnoId', alumnoCtrl.deleteAlumno)
//me da el alumno NO asignado a nada
api.get('/alumno/unassigned', alumnoCtrl.getUnassignedBikes);
//api.get('/bikes/unassigned', bikeCtrl.getUnassignedBikes);




//ASIGNATURAS: http://localhost:3000/api/asignatura
//crear asignatura - FUNCIONA
api.post('/asignatura/nueva', asignaturaCtrl.saveAsignatura)
//listado de asignaturas - FUNCIONA
api.get('/asignatura/listaAsignaturas', asignaturaCtrl.getAsignaturas)




//detalle asignatura - FUNCIONA
api.get('/asignatura/:asignaturaId', asignaturaCtrl.getAsignatura)
//modificar asignatura
//api.get('/asignatura/modificar/:asignaturaId', ?????)
//eliminar asignatura
//api.get('/asignatura/eliminar/:asignaturaId', ?????)



//ASIGNATURAS Y ALUMNOS: http://localhost:3000/api/relacion


// añadir alumno a asignatura si NO esta asignado - FUNCIONA
api.put('/relacion/addAlumnoToAsignatura', asignaturaCtrl.addAlumno)
//api.put('/relacion/:asignaturaId/:alumnoId', asignaturaCtrl.addAlumno)
//listas alumnos de una asignatura
api.get('/relacion/listaAlumnos/:asignaturaId', asignaturaCtrl.getAlumnosdeAsignatura)
//Eliminar bicis de una estacion en concreto --DELETE--
api.delete('/relacion/stations/:stationId/deletebike/:bikeId', asignaturaCtrl.deleteBikeStation)

//listado asignaturas con alumnos
api.get('/relacion/listaAsignaturasConAlumnos', asignaturaCtrl.getAsignaturasconalumnos)
//detalle alumno de una asignatura -- FUNCIONA
api.get('/relacion/alumnoDeAsignatura/:alumnoId', asignaturaCtrl.getAlumno)



module.exports = api;