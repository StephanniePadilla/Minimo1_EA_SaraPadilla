import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Alumnos } from "../models/alumnos";
import { Environments } from "./environments"
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {  
  environment: Environments;
  selectedAlumno: Alumnos; 

  constructor( private http: HttpClient) {
    this.selectedAlumno = new Alumnos("","",0,"");
    this.environment = new Environments();
   }
   //recoger los datos en http 

  //Añade alumno
   addAlumno(alumno: Alumnos) {
    return this.http.post(this.environment.urlAlumno + "/nuevo", alumno)
  }

  //Me devuelve una lista de los Alumnos
   getAlumnos():Observable<Alumnos[]> { //tengo que recibir el tipo User para que me haga bien la lista
    return this.http.get<Alumnos[]>(this.environment.urlAlumno + "/listaAlumnos");
  }

  //Me borra el alumno
   deleteAlumno(_id: string) {
    return this.http.delete(this.environment.urlAlumno + "/eliminar" + `/${_id}`);
  }

  getAlumno(_id: string):Observable<Alumnos> {
    return this.http.get<Alumnos>(this.environment.urlAlumno + `/${_id}`);
  }

  ///relacion/:asignaturaId/:alumnoId
  addBike(_idStation: string, _idBike: string){
    return this.http.put(this.environment.urlRelacion + "/relacion" + `/${_idStation}` + `/${_idBike}`, null /*alumno*/);
  }

  getUnassignedBikes() {
    return this.http.get(this.environment.urlAlumno + '/unassigned');
  }
   
}
