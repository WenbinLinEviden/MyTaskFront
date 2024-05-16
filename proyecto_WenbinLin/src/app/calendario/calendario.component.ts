import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LogComponent } from '../log/log.component';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, LogComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  select: boolean = false;
  fechaHoraActual: Date = new Date();
  fechaActual: string = '';
  horaActual: string = '';
  total: number = 0;
  trabajo: number = 0;
  descanso: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.actualizarFechaHora();
    setInterval(() => {
      this.actualizarFechaHora();
    }, 1000);
  }

  private actualizarFechaHora(): void {
    this.fechaHoraActual = new Date();
    this.fechaActual = this.fechaHoraActual.toLocaleDateString();
    this.horaActual = this.fechaHoraActual.toLocaleTimeString();
  }
}
