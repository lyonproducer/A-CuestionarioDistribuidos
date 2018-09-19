import { Injectable } from '@angular/core';
import { Pregunta } from '../../Models/Pregunta';
import { Resultado } from '../../Models/Resultado';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentimientoService {

  preguntas : Pregunta[];
  sentimiento:boolean = false;

  sentimientoResultado:Resultado;

  constructor(private http: HttpClient) { }

  getPreguntasAyudador(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasAyudador');
  }

  getPreguntasTriunfador(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasTriunfador');
  }

  getPreguntasArtista(){
    return this.http.get<Pregunta[]>('http://127.0.0.1:8000/api/preguntasArtista');
  }

  postResultado(resultado:Resultado){
    return this.http.post<Resultado>('http://127.0.0.1:8000/api/respuestasSentimiento',resultado);
  }
}
