import { Component, OnInit } from '@angular/core';
import {Asignaturas} from "../../models/asignaturas";
import {ActivatedRoute} from "@angular/router";
import {AsignaturaService} from "../../services/asignatura.service";
import {Alumnos} from "../../models/alumnos";
import {AlumnosService} from "../../services/alumnos.service";

@Component({
  selector: 'app-bicisdeestacion',
  templateUrl: './bicisdeestacion.component.html',
  styleUrls: ['./bicisdeestacion.component.css']
})
export class BicisdeestacionComponent implements OnInit {

  asignatura: Asignaturas;
  alumno: Alumnos;

  alumnos: Alumnos[]; //unassignedBikes: Alumnos[];
  asignaturas: Asignaturas; //stationBikeDetail: Asignaturas;

  body: object;
  alumnosService: AlumnosService;


  constructor(private activatedRouter: ActivatedRoute, alumnosService: AlumnosService, private asignaturaService: AsignaturaService) {
    this.asignatura = new Asignaturas();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.asignatura._id = params['id'];
      } else {
        this.asignatura._id = '';
      }
    });
    this.getBici(this.asignatura._id);
  }

  getBici(id: string) {
    this.asignaturaService.getBicisdeEstacion(id)
      .subscribe(res =>{
        this.alumno = res["alumno"];
      });
    console.log(this.alumno);
  }

  async deleteBikeStation(id: string, i: number) {
    if (confirm('Are yo sure you want to delete it?')) {
      await this.asignaturaService.deleteBikeStation(this.asignaturas._id, id)
        .subscribe(res => {
            console.log(res);
            this.asignaturas.bikes.splice(i, 1);
            this.getUnassignedBikes();
          },
          err => {
            console.log(err);
          });
    }
  }

  async getUnassignedBikes() {
    await this.alumnosService.getUnassignedBikes()
      .subscribe(res => {
        console.log(res);
        this.alumnos = res as Alumnos[];
      });
    console.log(this.alumnos);
  }
}
