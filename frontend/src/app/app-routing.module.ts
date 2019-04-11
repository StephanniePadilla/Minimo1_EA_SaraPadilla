import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MainComponent } from "./components/main/main.component";
import { NewasignaturaComponent } from "./components/newasignatura/newasignatura.component";
import { NewalumnoComponent } from "./components/newalumno/newalumno.component";
import { AlumnodetalleComponent } from "./components/alumnodetalle/alumnodetalle.component";
import { AsignaturadetalleComponent } from "./components/asignaturadetalle/asignaturadetalle.component";
import { BicisdeestacionComponent } from "./components/bicisdeestacion/bicisdeestacion.component";
import {AddbikeComponent} from "./components/addbike/addbike.component";

const routes: Routes = [

  {path: 'api/asignaturas/:id', component: AsignaturasComponent},
  {path: 'api/asignatura/:id', component: AsignaturasComponent},
  {path: 'api/alumno/:id', component: AlumnosComponent},
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'add_subject', component: NewasignaturaComponent},
  {path: 'add_student', component: NewalumnoComponent},
  {path: 'subjectList', component: AsignaturasComponent},
  {path: 'studentList', component: AlumnosComponent},
  {path:'studentList/studentDetail/:id', component: AlumnodetalleComponent},
  {path: 'subjectList/subjectDetail/:id', component: AsignaturadetalleComponent},
  {path: 'subjectList/subjectBikes/:id', component: BicisdeestacionComponent},
  {path: 'subjectBikes', component: AddbikeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
