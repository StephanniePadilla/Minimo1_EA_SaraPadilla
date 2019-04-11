import {Alumnos} from './alumnos';

export class Asignaturas {
    _id: string;
    name: string;
    state: string;
    description: string;
    bikes: Alumnos[];

    constructor(_id: string ='',name: string ='',state: string ='',description: string ='', bikes = null){
        this._id = _id;
        this.name = name;
        this.state = state;
        this.description = description;
        this.bikes = bikes;
    }
}
