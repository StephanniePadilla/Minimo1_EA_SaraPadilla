import { Component, OnInit } from '@angular/core';
import {AlumnosService} from "../../services/alumnos.service";
import {Router} from "@angular/router";
import {Alumnos} from "../../models/alumnos";
import {HttpErrorResponse} from "@angular/common/http";
import {Asignaturas} from "../../models/asignaturas";

@Component({
  selector: 'app-addbike',
  templateUrl: './addbike.component.html',
  styleUrls: ['./addbike.component.css']
})
export class AddbikeComponent implements OnInit {

  constructor(private alumnosService: AlumnosService, private router: Router) {

  }

  alumnos: Alumnos[];
  asignaturas: Asignaturas[];

  ngOnInit() {
    this.getStudents();
  }

  getStudents(){
    this.alumnosService.getAlumnos()
      .subscribe(res =>{
        this.alumnos = res; //res me recibe la lista de users
      });
  }


  addBike(idStation: string, idBike, i: number){
    this.alumnosService.addBike(idStation, idBike)
      .subscribe(
        res =>{
          console.log(res);
          console.log("Se ha añadido correctamente ", i);
          //this.getStudents();

          //Two way data binding!
          this.alumnos.splice(i,1);
          console.log("Se ha añadido correctamente ", this.alumnos);

        },
        err => {
          this.handleError(err);
        });
  }
  
}
