import { Component, OnInit } from '@angular/core';
import {Asignaturas} from "../../models/asignaturas";
import {ActivatedRoute} from "@angular/router";
import {AsignaturaService} from "../../services/asignatura.service";
import {Alumnos} from "../../models/alumnos";

@Component({
  selector: 'app-bicisdeestacion',
  templateUrl: './bicisdeestacion.component.html',
  styleUrls: ['./bicisdeestacion.component.css']
})
export class BicisdeestacionComponent implements OnInit {

  asignatura: Asignaturas;
  alumno: Alumnos;

  constructor(private activatedRouter: ActivatedRoute, private asignaturaService: AsignaturaService) {
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
}
