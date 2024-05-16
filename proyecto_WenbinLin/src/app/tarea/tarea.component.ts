import { Component, Input, NgModule, OnInit, SimpleChanges } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, catchError } from 'rxjs';
import { Tarea } from '../models/tarea';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
                
@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent implements OnInit {

  @Input() refresh: boolean = false;
  protected  tareas$!: Observable<Tarea[]>;
  protected  tareasLista: Tarea[] = [];
  protected  tarea: Tarea = {
    id: 0,
    init: 'vacio',
    ended: 'vacio',
    descripcion: 'vacio',
    descanso: true,
    calendario_id: 1
  };

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes: ", changes);
    if (changes['refresh'] && changes['refresh'].currentValue) {
      this.loadData();
    }
  }

  actualizarDescripcion(event: Event): void {
    this.tarea.descripcion = (<HTMLInputElement>event.target).value;
  }

  actualizarInit(event: Event): void {
    this.tarea.init = (<HTMLInputElement>event.target).value;
  }

  actualizarEnded(event: Event): void {
    this.tarea.ended = (<HTMLInputElement>event.target).value;
  }

  actualizarDescanso(event: Event): void {
    this.tarea.descanso = (<HTMLInputElement>event.target).value === "trabajo" ? false : true;
  }

  editarTarea(item: Tarea): void {
    this.tareasService.putTarea(item, item.id).subscribe(() => {
      this.tarea=item;
    });

  }

  loadData(): void {
    this.tareas$ = this.tareasService.getTareaList();
    this.tareas$.subscribe((tareas: Tarea[]) => {
      this.tareasLista = tareas;
    });
  }

  actualizarTarea(): void {
    this.tareasService.putTarea(this.tarea, this.tarea.id).subscribe(() => {
      this.loadData();
    });
  }

  eliminarTarea(tarea: Tarea): void {
    this.tareasService.deleteTarea(tarea.id).subscribe(() => {
      this.tareasLista = this.tareasLista.filter((t: Tarea) => t.id !== tarea.id);
    });
  }
}


