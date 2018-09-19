import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../../Models/Pregunta';
import { Resultado } from 'src/app/Models/Resultado';

@Injectable({
  providedIn: 'root'
})
export class PensamientoService {

  preguntas : Pregunta[];
  pensamiento:boolean = false;

  pensamientoResultado:Resultado;

  constructor(private http: HttpClient) { }

  getPreguntasPensador(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasPensador');
  }

  getPreguntasLeal(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasLeal');
  }

  getPreguntasEntusiasta(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasEntusiasta');
  }

  postResultado(resultado:Resultado){
    return this.http.post<Resultado>('http://127.0.0.1:8000/api/respuestasPensamiento',resultado);
  }

}
