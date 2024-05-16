import { Component } from '@angular/core';
import { TareaComponent } from '../tarea/tarea.component';
import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-hoy',
  standalone: true,
  imports: [TareaComponent, LogComponent],
  templateUrl: './hoy.component.html',
  styleUrl: './hoy.component.css'
})

export class HoyComponent {
  select: boolean = false;
  fechaHoraActual: Date = new Date();
  fechaActual: string = '';
  horaActual: string = '';
  total: number = 0;
  trabajo: number = 0;
  descanso: number = 0;

  actualizarCont(event: any) {
    this.total = event.total;
    this.trabajo = event.trabajo;
    this.descanso = event.descanso;
  }

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
