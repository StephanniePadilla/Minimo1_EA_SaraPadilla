import { Component, OnInit } from '@angular/core';
import {AlumnosService} from "../../services/alumnos.service";
import {ActivatedRoute} from "@angular/router";
import {Alumnos} from "../../models/alumnos";
import {Asignaturas} from "../../models/asignaturas";
import {AsignaturaService} from "../../services/asignatura.service";

@Component({
  selector: 'app-addbike',
  templateUrl: './addbike.component.html',
  styleUrls: ['./addbike.component.css']
})
export class AddbikeComponent implements OnInit {

  alumnos: Alumnos[]; //unassignedBikes: Alumnos[];
  asignaturas: Asignaturas; //stationBikeDetail: Asignaturas;
  body: object;
  asignaturasService: AsignaturaService;

  constructor(private alumnosService: AlumnosService, asignaturasService: AsignaturaService, private activatedRouter: ActivatedRoute) {
    this.asignaturas = new Asignaturas();
    this.alumnos = [];
  }


  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.asignaturas._id = params.id;
      } else {
        this.asignaturas._id = '';
      }
    });
    this.getBikeDetail(this.asignaturas._id);
    this.getUnassignedBikes();
  }

  async getUnassignedBikes() {
    await this.alumnosService.getUnassignedBikes()
      .subscribe(res => {
        console.log(res);
        this.alumnos = res as Alumnos[];
      });
    console.log(this.alumnos);
  }

  //Me da la lista de bicis de una estacion
  async getBikeDetail(id: string) {
    await this.asignaturasService.getBicisdeEstacion(id)
      .subscribe(res => {
        console.log(res);
        this.asignaturas = res as Asignaturas;
      });
    console.log(this.asignaturas);
  }

  async deleteBikeStation(id: string, i: number) {
    if (confirm('Are yo sure you want to delete it?')) {
      await this.asignaturasService.deleteBikeStation(this.asignaturas._id, id)
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


  async addBikeStation(id: string, i: number) {
    this.body = {
      stationId: this.asignaturas._id,
      bikeId: id
    };
    await this.asignaturasService.postBikeStation(this.body)
      .subscribe(res => {
          console.log(res);
          this.alumnos.splice(i, 1);
          this.getBikeDetail(this.asignaturas._id);
        },
        err => {
          console.log(err);
        });
  }

}

