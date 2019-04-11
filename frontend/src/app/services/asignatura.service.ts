import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asignaturas } from "../models/asignaturas";
import { Environments } from "./environments"
import { Observable } from "rxjs";
import {Alumnos} from "../models/alumnos";

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  environment: Environments;
  selectedAlumno: Asignaturas; 

  constructor( private http: HttpClient) { 
    this.selectedAlumno = new Asignaturas("","","");
    this.environment = new Environments();
  }

  addAsignatura(asignatura: Asignaturas) {
    return this.http.post(this.environment.urlAsignatura + "/nueva" , asignatura)
  }

  getAsignaturas() :Observable<Asignaturas[]> {
    return this.http.get<Asignaturas[]>(this.environment.urlAsignatura + "/listaAsignaturas");
  }

  //Me borra el alumno
  deleteAsignatura(_id: string) {
    return this.http.delete(this.environment.urlAsignatura + "/eliminar" + `/${_id}`);
  }

  getAsignatura(_id: string) :Observable<Asignaturas> {
    return this.http.get<Asignaturas>(this.environment.urlAsignatura + `/${_id}`);
  }
  
  getBicisdeEstacion(_id: string) :Observable<Asignaturas> {
    return this.http.get<Asignaturas>(this.environment.urlRelacion + '/listaAlumnos' + `/${_id}`);
  }

  //añadir bike a estacion
  postBikeStation(ids: object) {
    return this.http.post(this.environment.urlRelacion + '/addAlumnoToAsignatura', ids);
  }

  //borra la bike de la estacion
  deleteBikeStation(stationId: string, bikeId: string) {
    return this.http.delete(this.environment.urlRelacion + '/stations' + `/${stationId}` + '/deletebike' + `/${bikeId}`);
  }

  //listas alumnos de una asignatura
  //api.get('/relacion/listaAlumnos/:asignaturaId', asignaturaCtrl.getAlumnosdeAsignatura)

}
