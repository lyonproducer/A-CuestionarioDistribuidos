import { Component, OnInit } from '@angular/core';
import { SentimientoService } from '../../../../services/sentimiento/sentimiento.service';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resultado } from '../../../../Models/Resultado';
import { Pregunta } from '../../../../Models/Pregunta';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sentimiento',
  templateUrl: './sentimiento.component.html',
  styleUrls: ['./sentimiento.component.css']
})
export class SentimientoComponent implements OnInit {

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

  ayudador:boolean= false;
  triunfador:boolean=false;
  artista:boolean=false;

  constructor(private sentimientoService:SentimientoService,
              private userService:UserService,
              private rutaActiva: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.ayudador = true;
    this.refreshPensadorList();
  }

  refreshPensadorList() {
    this.sentimientoService.getPreguntasAyudador().subscribe((res) => {
      this.sentimientoService.preguntas = res as Pregunta[];
    });
  }

  refreshLealList() {
    this.sentimientoService.getPreguntasTriunfador().subscribe((res) => {
      this.sentimientoService.preguntas = res as Pregunta[];
    });
  }

  refreshEntusiastaList() {
    this.sentimientoService.getPreguntasArtista().subscribe((res) => {
      this.sentimientoService.preguntas = res as Pregunta[];
    });
  }

  onSubmit(form: NgForm){

    console.log(form.value);
    var contar = Object.keys(form.value).length;

    if(this.ayudador){
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + i);
        a = parseInt(punto);
        this.total = a + this.total;
      }
      console.log('El resultado ayudador ' + this.total);
      //Termina el for -------------------
      this.resultado1.cedula = this.userService.selectedUser.cedula;
      this.resultado1.total = this.total;
      this.resultado1.tipo = 'Ayudador';

      this.onSave(this.resultado1);
      this.refreshLealList();
      //---------
      punto=0;
      //---------
      this.ayudador=false;
      this.triunfador=true;

    }else if (this.triunfador){

      this.total=0;
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + 2 + i);
        a = parseInt(punto);
        this.total = this.total + a;
      }
      console.log('El resultado triunfador ' + this.total);
      //Termina el for -------------------
      this.resultado2.cedula = this.userService.selectedUser.cedula;
      this.resultado2.total = this.total;
      this.resultado2.tipo = 'Triunfador';
      
      this.onSave(this.resultado2);
      this.refreshEntusiastaList();

      //-------------
      this.triunfador=false;
      this.artista=true;


    }else if (this.artista){

      this.total=0;
      for(var i=1; i<=contar; i++){
        var a:number=0;
        var punto = eval('form.value.puntos' + 4 + i);
        a = parseInt(punto);
        this.total = this.total + a;
      }
      console.log('El resultado Artista ' + this.total);
      //Termina el for -------------------
      this.resultado3.cedula = this.userService.selectedUser.cedula;
      this.resultado3.total = this.total;
      this.resultado3.tipo = 'Artista';
      
      this.onSave(this.resultado3);
      this.escogerResultado(this.resultado1.total,this.resultado2.total,this.resultado3.total);

      this.artista=false;
      this.router.navigateByUrl('selectQuestions');
      this.sentimientoService.sentimiento = true;
      
    }  
    
  }

  onSave(resultado:Resultado){
    this.sentimientoService.postResultado(resultado).subscribe((res)=> {
      //console.log("guardado en bdd " + resultado.total);
    });
  }

  escogerResultado(pensador:number, leal:number,entusiasta:number){

    if((pensador >= leal) && (pensador >= entusiasta)){
      this.sentimientoService.sentimientoResultado = this.resultado1;
    }else
    if((leal >= pensador) && (leal >= entusiasta)){
      this.sentimientoService.sentimientoResultado = this.resultado2;
    }else
    if((entusiasta >= leal) && (entusiasta >= pensador)){
      this.sentimientoService.sentimientoResultado = this.resultado3;
    }
  }
}
