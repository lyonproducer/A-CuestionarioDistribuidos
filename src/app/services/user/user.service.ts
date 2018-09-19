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

  getPaises(){
    return this.http.get<Pais[]>('https://restcountries.eu/rest/v2/all?fields=name');
  }

  postUser(user : User){
    return this.http.post('http://127.0.0.1:8000/api/user', user);
  }

  postRespuesta(resultado : Resultado){
    return this.http.post('http://127.0.0.1:8000/api/userResultado', resultado);
  }

}
