import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Resultado } from '../../Models/Resultado';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.refreshResultadosList();
  }

  refreshResultadosList() {
    this.userService.getUserResultados().subscribe((res) => {
      this.userService.resultados = res as Resultado[];
    });
  }

}
