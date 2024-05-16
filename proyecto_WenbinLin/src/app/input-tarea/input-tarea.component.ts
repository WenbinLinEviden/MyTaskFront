import { Component } from '@angular/core';
import { TareaComponent } from '../tarea/tarea.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TareasService } from '../services/tareas.service';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-input-tarea',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TareaComponent],
  templateUrl: './input-tarea.component.html',
  styleUrl: './input-tarea.component.css'
})
export class InputTareaComponent {
  protected refreshTarea: boolean = false;
  protected fechaActual: Date = new Date();
  protected fechaSolo: string = this.fechaActual.toISOString().split('T')[0];
  protected bloqueo:boolean = true;
  protected descripcion:string = '';
  protected started:string = "00:00";
  protected ended:string = "01:00";
  protected tipoTurno:boolean = false;

  constructor(private tareasService: TareasService, private router: Router) { }
  ngOnInit(): void {
  }

  actualizarDescripcion(event: Event) {
    this.descripcion = (<HTMLInputElement>event.target).value;
  }

  actualizarStarted(event: Event) {
    this.started = (<HTMLInputElement>event.target).value;
  }

  actualizarEnded(event: Event) {
    this.ended = (<HTMLInputElement>event.target).value;
  }

  prueba(){
    if (this.bloqueo)
      this.bloqueo=false;
    else
      this.bloqueo=true;
  }

  setTipo(event: Event){
    this.tipoTurno=(<HTMLInputElement>event.target).value==="trabajo" ? false : true;
  }

  anadir(){
    const nuevaTarea: Tarea = {
      
      id: 0,
      init: this.started,
      ended: this.ended,
      descripcion: this.descripcion,
      descanso: this.tipoTurno,
      calendario_id: 1
    };

    this.tareasService.postTarea(nuevaTarea).subscribe(() => {
      console.log('Antes de refrescar:', this.refreshTarea);
      this.refreshTarea = !this.refreshTarea;
      console.log('Después de refrescar:', this.refreshTarea);
    }, error => {
      console.error('Error al añadir la tarea:', error);
    });
  }


}
