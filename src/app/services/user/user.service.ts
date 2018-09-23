import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../../Models/Pais';
import { User } from '../../Models/User';
import { Resultado } from '../../Models/Resultado';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  paises : Pais[];
  selectedUser: User;

  resultados: Resultado[];

  getPaises(){
    return this.http.get<Pais[]>('https://restcountries.eu/rest/v2/all?fields=name');
  }

  postUser(user : User){
    return this.http.post('http://127.0.0.1:8000/api/user', user);
  }

  postRespuesta(resultado : Resultado){
    return this.http.post('http://127.0.0.1:8000/api/userResultado', resultado);
  }

  getUserResultados(){
    return this.http.get('http://127.0.0.1:8000/api/resultado');
  }

  postSimulacion(cantidad : number){
    return this.http.post(`http://127.0.0.1:8000/api/generateUsers/` + `${cantidad}`, cantidad);
  }

  postCubo(cantidad: number){
    return this.http.post(`http://127.0.0.1:8000/api/generateCubeDB`, cantidad);
  }
}
