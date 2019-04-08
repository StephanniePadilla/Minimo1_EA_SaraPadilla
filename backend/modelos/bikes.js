'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//esquema del alumno
const BikesSchema  = new Schema({
    name: { type: String,unique: true},
    kms: { type: Number, default:0, required: true },
    description: { type: String, required: true, unique: true },
    assigned: { type: Boolean, required: true, unique: false }

})
/*  //encriptacion de datos 
AlumnosSchema.pre('save', (next) => {
    let alumno = this
    bcrypt.genSalt(10, (err, salt)=> {
        if (err) return next(err)
        bcrypt.hash(alumno.name, salt, null, (err, hash) => {
            alumno.name
            next()
        })
    })
})
*/
module.exports = mongoose.model('bikes', BikesSchema)