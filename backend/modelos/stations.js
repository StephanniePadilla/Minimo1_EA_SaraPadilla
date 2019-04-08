'use strict'
const mongoose = require('mongoose')
const bikesSchema = require('./bikes').schema
const Schema = mongoose.Schema

//esquema de alumnos 
const StationSchema = new Schema({
    name: {type: String,unique: true},
    state: String,
    description: String,
    bikes: [{type: Schema.Types.ObjectId, ref: 'Bike'}]
    //alumnos: [alumnosSchema]
})


module.exports = mongoose.model('Station', StationSchema)