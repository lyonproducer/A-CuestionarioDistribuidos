import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-automatic',
  templateUrl: './automatic.component.html',
  styleUrls: ['./automatic.component.css']
})
export class AutomaticComponent implements OnInit {

  cantidad:number;

  constructor(private userService: UserService, private router : Router,private spinner: NgxSpinnerService, private snotify:SnotifyService) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){

    this.spinner.show();
    console.log(form.value);
    this.userService.postSimulacion(form.value.cantidad).subscribe( 
      data => {
        console.log("funciona");
        this.spinner.hide();
        this.router.navigateByUrl('userList');
        this.snotify.success('Datos generados con exito',{timeout:0});
      },
      error => {
        this.snotify.error('Hubo un error!',{timeout:0});
      });
  }

}
