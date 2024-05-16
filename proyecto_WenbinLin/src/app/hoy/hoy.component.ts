import { Component } from '@angular/core';
import { TareaComponent } from '../tarea/tarea.component';

@Component({
  selector: 'app-hoy',
  standalone: true,
  imports: [TareaComponent],
  templateUrl: './hoy.component.html',
  styleUrl: './hoy.component.css'
})

export class HoyComponent {
  fechaActual: Date = new Date(); // Obtiene la fecha y hora actual
  fechaSolo: string = this.fechaActual.toISOString().split('T')[0];
}
