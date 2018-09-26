import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Resultado } from '../../Models/Resultado';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService:UserService,
    private spinner: NgxSpinnerService,
    private snotify: SnotifyService) { }

  ngOnInit() {
    this.refreshResultadosList();
  }

  refreshResultadosList() {
    this.userService.getUserResultados().subscribe((res) => {
      this.userService.resultados = res as Resultado[];
    });
  }

  saveData(){
    let a;
    this.spinner.show();
    this.userService.postCubo(a).subscribe(
      data=>{
        console.log("datos guardados");
        this.spinner.hide();
        this.snotify.success(
          'Guardados datos con exito',{timeout:0}
        );
      });
  }

  eraseData(){
    let a;
    this.spinner.show();
    this.userService.eraseData(a).subscribe(
      data=>{
        
        if(data == false){
          this.snotify.error(
            'No hay datos para eliminar',{timeout:0}
          );
        }else{
          this.refreshResultadosList();
          this.snotify.success(
            'Datos eliminados con exito',{timeout:0}
          );
        }

        this.spinner.hide();

      });
  }

}
