'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//esquema de alumnos 
const StationSchema = new Schema({
    name: {type: String,unique: true},
    state: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    bikes: [{type: Schema.ObjectId, ref: 'Bike', unique: false}]
})


module.exports = mongoose.model('Station', StationSchema)