import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PensamientoService } from '../../../../services/pensamiento/pensamiento.service';
import { Pregunta } from '../../../../Models/Pregunta';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { Resultado } from '../../../../Models/Resultado';

@Component({
  selector: 'app-pensamiento',
  templateUrl: './pensamiento.component.html',
  styleUrls: ['./pensamiento.component.css']
})
export class PensamientoComponent implements OnInit {

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

  pensador:boolean= false;
  leal:boolean=false;
  entusiasta:boolean=false;

  constructor(
    private pensamientoService:PensamientoService,
    private userService:UserService,
    private rutaActiva: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.pensador = true;
    this.refreshPensadorList();
  }

  refreshPensadorList() {
    this.pensamientoService.getPreguntasPensador().subscribe((res) => {
      this.pensamientoService.preguntas = res as Pregunta[];
    });
  }

  refreshLealList() {
    this.pensamientoService.getPreguntasLeal().subscribe((res) => {
      this.pensamientoService.preguntas = res as Pregunta[];
    });
  }

  refreshEntusiastaList() {
    this.pensamientoService.getPreguntasEntusiasta().subscribe((res) => {
      this.pensamientoService.preguntas = res as Pregunta[];
    });
  }

  onSubmit(form: NgForm){

    console.log(form.value);
    var contar = Object.keys(form.value).length;

    if(this.pensador){
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + i);
        a = parseInt(punto);
        this.total = a + this.total;
      }
      console.log('El resultado pensador ' + this.total);
      //Termina el for -------------------
      this.resultado1.cedula = 26691085;
      this.resultado1.total = this.total;
      this.resultado1.tipo = 'Pensador';

      this.onSave(this.resultado1);
      this.refreshLealList();
      //---------
      punto=0;
      //---------
      this.pensador=false;
      this.leal=true;

    }else if (this.leal){

      this.total=0;
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + 2 + i);
        a = parseInt(punto);
        this.total = this.total + a;
      }
      console.log('El resultado leal ' + this.total);
      //Termina el for -------------------
      this.resultado2.cedula = 26691085;
      this.resultado2.total = this.total;
      this.resultado2.tipo = 'Leal';
      
      this.onSave(this.resultado2);
      this.refreshEntusiastaList();

      //-------------
      this.leal=false;
      this.entusiasta=true;


    }else if (this.entusiasta){

      this.total=0;
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + 4 + i);
        a = parseInt(punto);
        this.total = this.total + a;
      }
      console.log('El resultado entusiasta ' + this.total);
      //Termina el for -------------------
      this.resultado3.cedula = 26691085;
      this.resultado3.total = this.total;
      this.resultado3.tipo = 'Entusiasta';
      
      this.onSave(this.resultado3);
      this.escogerResultado(this.resultado1.total,this.resultado2.total,this.resultado3.total);

      this.entusiasta=false;
      this.router.navigateByUrl('selectQuestions');
      this.pensamientoService.pensamiento = true;
      
    }  
    
  }

  onSave(resultado:Resultado){
    this.pensamientoService.postResultado(resultado).subscribe((res)=> {
      console.log("guardado en bdd " + resultado.total);
    });
  }

  escogerResultado(pensador:number, leal:number,entusiasta:number){

    if((pensador >= leal) && (pensador >= entusiasta)){
      this.pensamientoService.pensamientoResultado = this.resultado1;
      console.log("es pensador");
    }else 
    if((leal >= pensador) && (leal >= entusiasta)){
      this.pensamientoService.pensamientoResultado = this.resultado2;
      console.log("es leal");
    }else 
    if((entusiasta >= leal) && (entusiasta >= pensador)){
      this.pensamientoService.pensamientoResultado = this.resultado3;
      console.log("es entusiasta");
    }
  }
}


