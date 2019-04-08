import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsignaturasComponent } from './components/asignaturas/asignaturas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { NewasignaturaComponent } from './components/newasignatura/newasignatura.component';
import { MainComponent } from './components/main/main.component';
import { NewalumnoComponent } from './components/newalumno/newalumno.component';
import { AlumnodetalleComponent } from "./components/alumnodetalle/alumnodetalle.component";
import { AsignaturadetalleComponent } from './components/asignaturadetalle/asignaturadetalle.component';
import { BicisdeestacionComponent } from './components/bicisdeestacion/bicisdeestacion.component';
import { AddbikeComponent } from './components/addbike/addbike.component';


@NgModule({
  declarations: [
    AppComponent,
    AsignaturasComponent,
    AlumnosComponent,
    NewasignaturaComponent,
    MainComponent,
    NewalumnoComponent,
    AlumnodetalleComponent,
    AsignaturadetalleComponent,
    BicisdeestacionComponent,
    AddbikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
