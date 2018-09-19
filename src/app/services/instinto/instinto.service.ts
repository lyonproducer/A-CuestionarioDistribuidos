import { Injectable } from '@angular/core';
import { Pregunta } from '../../Models/Pregunta';
import { Resultado } from '../../Models/Resultado';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstintoService {

  preguntas : Pregunta[];
  instinto:boolean = false;

  instintoResultado:Resultado;

  constructor(private http: HttpClient) { }

  getPreguntasReformador(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasReformador');
  }

  getPreguntasProtector(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasProtector');
  }

  getPreguntasPacifico(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasPacifico');
  }

  postResultado(resultado:Resultado){
    return this.http.post<Resultado>('http://127.0.0.1:8000/api/respuestasInstinto',resultado);
  }
}
