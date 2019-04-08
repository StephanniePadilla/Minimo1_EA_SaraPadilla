export class Alumnos {
    _id: string;
    name: string;
    kms: number;
    description: string;

    constructor(_id: string ='',name: string ='', kms = 0 , description: string =''){
        this._id = _id;
        this.name = name;
        this.kms = kms;
        this.description = description;
    }

}
