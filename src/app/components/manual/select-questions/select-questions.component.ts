import { Component, OnInit } from '@angular/core';
import { PensamientoService } from '../../../services/pensamiento/pensamiento.service';
import { UserService } from '../../../services/user/user.service';
import { Resultado } from '../../../Models/Resultado';
import { Router } from '@angular/router';
import { SentimientoService } from '../../../services/sentimiento/sentimiento.service';
import { InstintoService } from '../../../services/instinto/instinto.service';

@Component({
  selector: 'app-select-questions',
  templateUrl: './select-questions.component.html',
  styleUrls: ['./select-questions.component.css']
})
export class SelectQuestionsComponent implements OnInit {

  sentimiento:Resultado={
    tipo:null,
    total:0,
    cedula:null
  };

  pensamiento:Resultado={
    tipo:null,
    total:0,
    cedula:null
  };

  instinto:Resultado={
    tipo:null,
    total:0,
    cedula:null
  };

  constructor(
    private pensamientoService:PensamientoService,
    private sentimientoService:SentimientoService,
    private instintoService:InstintoService,
    private userService : UserService,
    private router: Router
    ) { }

  ngOnInit() {

    if(this.sentimientoService.sentimientoResultado){
      this.sentimiento = this.sentimientoService.sentimientoResultado;
    }

    if(this.pensamientoService.pensamientoResultado){
      this.pensamiento = this.pensamientoService.pensamientoResultado;
    }

    if(this.instintoService.instintoResultado){
      this.instinto = this.instintoService.instintoResultado;
    }
    

  }

  mostrarResultado(){

    if((this.pensamiento.total > this.sentimiento.total) 
    && (this.pensamiento.total > this.instinto.total)){
      alert("el resultado es: " + this.pensamiento.tipo);
      //this.router.navigateByUrl('');
      //this.guardarTipoFinal(this.pensamiento);
    }else

    if((this.sentimiento.total > this.pensamiento.total)
    &&(this.sentimiento.total > this.instinto.total)){
      alert("el resultado es: " + this.sentimiento.tipo);
      //this.router.navigateByUrl('');
      //this.guardarTipoFinal(this.sentimiento);
    }
    else
    if((this.instinto.total > this.pensamiento.total)
    &&(this.instinto.total > this.sentimiento.total)){
      alert("el resultado es: " + this.instinto.tipo);
      //this.router.navigateByUrl('');
      //this.guardarTipoFinal(this.sentimiento);
    }
    else
    alert("Realiza cualquier pregunta");

  }

  guardarTipoFinal(resultado:Resultado){
    this.userService.postRespuesta(resultado).subscribe();
  }
}
