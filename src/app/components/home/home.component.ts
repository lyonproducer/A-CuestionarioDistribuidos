import { Component, OnInit } from '@angular/core';
import { PensamientoService } from '../../services/pensamiento/pensamiento.service';
import { SentimientoService } from '../../services/sentimiento/sentimiento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private pensamientoService: PensamientoService,
              private sentimientoService: SentimientoService) {
   }

  ngOnInit() {
    this.pensamientoService.pensamiento = false;
    this.sentimientoService.sentimiento = false;
  }

}

