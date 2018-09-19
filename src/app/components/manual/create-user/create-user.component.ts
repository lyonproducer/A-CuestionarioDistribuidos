import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Pais } from '../../../Models/Pais';
import { User } from '../../../Models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  inputHijos =false;

  user: User = {
    id:null,
    nombre:null,
    cedula:null,
    sexo:null,
    edad:null,
    fechaNacimiento:null,
    estadoCivil:null,
    pais:null,
    profesion:null,
    tieneTrabajo:null,
    vivePadres:null,
    tieneHermanos:null,
    hermanos:null,
  }

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.refreshPaisesList();
  }

  refreshPaisesList() {
    this.userService.getPaises().subscribe((res) => {
      this.userService.paises = res as Pais[];
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    //this.workdesignService.selectedWorkdesign = null;
  }
  
  onSubmit(form: NgForm) {
  
    //console.log(form.value);
    this.userService.postUser(form.value).subscribe((res) => {
      this.resetForm;
      console.log("Añadido Correctamente");
      this.userService.selectedUser = form.value;
      console.log(form.value);
    });
    
  }

  activarInput(event){
    if(event == "Si"){
      this.inputHijos=true;

    }else
    this.inputHijos=false;
  }

}
