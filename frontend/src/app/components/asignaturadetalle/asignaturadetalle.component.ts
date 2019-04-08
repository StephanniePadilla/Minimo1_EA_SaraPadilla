import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Asignaturas} from "../../models/asignaturas";
import {AsignaturaService} from "../../services/asignatura.service";
import {Alumnos} from "../../models/alumnos";

@Component({
  selector: 'app-asignaturadetalle',
  templateUrl: './asignaturadetalle.component.html',
  styleUrls: ['./asignaturadetalle.component.css']
})
export class AsignaturadetalleComponent implements OnInit {

  asignatura: Asignaturas;

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
    this.getSubject(this.asignatura._id);
  }

  getSubject(id: string) {
    this.asignaturaService.getAsignatura(id)
      .subscribe(res =>{
        this.asignatura = res["asignatura"];
      });
    console.log(this.asignatura);
  }
}
