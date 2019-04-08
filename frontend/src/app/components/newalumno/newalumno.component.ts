import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AlumnosService} from "../../services/alumnos.service";
import {Alumnos} from "../../models/alumnos";

@Component({
  selector: 'app-newalumno',
  templateUrl: './newalumno.component.html',
  styleUrls: ['./newalumno.component.css']
})
export class NewalumnoComponent implements OnInit {

  newalumnoForm: FormGroup;

  validation_messages: any;

  constructor(private newalumnoService: AlumnosService,
              private router: Router, private formBuilder: FormBuilder) {

    this.newalumnoForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{1,40}$/)])),
        kms: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^((?!(0))[0-9]{2,4})$/)])),
        description: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,250}$/)])),
      }
    )
  }

  ngOnInit() {
    this.validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 1 and 40 characters long'}
      ],
      'price': [
        { type: 'required', message: 'Price is required'},
        { type: 'pattern', message: 'It can not begin by a 0 and has to be between 2 and 4 digits long'}
      ],
      'description': [
        { type: 'required', message: 'Description is required' },
        { type: 'pattern', message: 'It has to be between 3 and 250 characters long' }
      ]
    }
  }

  addAlumno() {
    console.log(this.newalumnoForm.value);
    let alumno = new Alumnos();
    alumno._id = "";
    alumno.name = this.newalumnoForm.value.name;
    alumno.kms = this.newalumnoForm.value.kms;
    alumno.description = this.newalumnoForm.value.description;

    this.newalumnoService.addAlumno(alumno)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);

          this.router.navigateByUrl("");
        },

        err => {
          console.log(err);
          this.handleError(err);
        });

  }

  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    } else if ( err.status == 404 ) {
      alert('404 not found');
    }

  }
}
