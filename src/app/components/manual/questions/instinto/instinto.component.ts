import { Component, OnInit } from '@angular/core';
import { Resultado } from '../../../../Models/Resultado';
import { Pregunta } from '../../../../Models/Pregunta';
import { InstintoService } from '../../../../services/instinto/instinto.service';
import { UserService } from '../../../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-instinto',
  templateUrl: './instinto.component.html',
  styleUrls: ['./instinto.component.css']
})
export class InstintoComponent implements OnInit {

  total:number = 0;

  resultado1: Resultado = {
    tipo:null,
    total:null,
    cedula:null,
  };

  resultado2: Resultado = {
    tipo:null,
    total:null,
    cedula:null,
  };

  resultado3: Resultado = {
    tipo:null,
    total:null,
    cedula:null,
  };

  reformador:boolean= false;
  protector:boolean=false;
  pacifico:boolean=false;

  constructor(private instintoService:InstintoService,
              private userService:UserService,
              private rutaActiva: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.reformador = true;
    this.refreshReformadorList();
  }

  refreshReformadorList() {
    this.instintoService.getPreguntasReformador().subscribe((res) => {
      this.instintoService.preguntas = res as Pregunta[];
    });
  }

  refreshProtectorList() {
    this.instintoService.getPreguntasProtector().subscribe((res) => {
      this.instintoService.preguntas = res as Pregunta[];
    });
  }

  refreshPacificoList() {
    this.instintoService.getPreguntasPacifico().subscribe((res) => {
      this.instintoService.preguntas = res as Pregunta[];
    });
  }

  onSubmit(form: NgForm){

    console.log(form.value);
    var contar = Object.keys(form.value).length;

    if(this.reformador){
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + i);
        a = parseInt(punto);
        this.total = a + this.total;
      }
      console.log('El resultado reformador ' + this.total);
      //Termina el for -------------------
      this.resultado1.cedula = this.userService.selectedUser.cedula;
      this.resultado1.total = this.total;
      this.resultado1.tipo = 'Reformador';

      this.onSave(this.resultado1);
      this.refreshProtectorList();
      //---------
      punto=0;
      //---------
      this.reformador=false;
      this.protector=true;

    }else if (this.protector){

      this.total=0;
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + 2 + i);
        a = parseInt(punto);
        this.total = this.total + a;
      }
      console.log('El resultado protector ' + this.total);
      //Termina el for -------------------
      this.resultado2.cedula = this.userService.selectedUser.cedula;
      this.resultado2.total = this.total;
      this.resultado2.tipo = 'Protector';
      
      this.onSave(this.resultado2);
      this.refreshPacificoList();

      //-------------
      this.protector=false;
      this.pacifico=true;


    }else if (this.pacifico){

      this.total=0;
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + 4 + i);
        a = parseInt(punto);
        this.total = this.total + a;
      }
      console.log('El resultado pacifico ' + this.total);
      //Termina el for -------------------
      this.resultado3.cedula = this.userService.selectedUser.cedula;
      this.resultado3.total = this.total;
      this.resultado3.tipo = 'Pacifico';
      
      this.onSave(this.resultado3);
      this.escogerResultado(this.resultado1.total,this.resultado2.total,this.resultado3.total);

      this.pacifico=false;
      this.router.navigateByUrl('selectQuestions');
      this.instintoService.instinto = true;
      
    }  
    
  }

  onSave(resultado:Resultado){
    this.instintoService.postResultado(resultado).subscribe((res)=> {
      //console.log("guardado en bdd " + resultado.total);
    });
  }

  escogerResultado(reformador:number, protector:number,pacifico:number){

    if((reformador >= protector) && (reformador >= pacifico)){
      this.instintoService.instintoResultado = this.resultado1;
    }else
    if((protector >= reformador) && (protector >= pacifico)){
      this.instintoService.instintoResultado = this.resultado2;
    }else
    if((pacifico >= protector) && (pacifico >= reformador)){
      this.instintoService.instintoResultado = this.resultado3;
    }
  }
}
