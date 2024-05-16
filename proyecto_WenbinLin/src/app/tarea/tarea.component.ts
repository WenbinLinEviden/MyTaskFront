import { Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, catchError } from 'rxjs';
import { Tarea } from '../models/tarea';
import { InputTareaComponent } from '../input-tarea/input-tarea.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { co } from '@fullcalendar/core/internal-common';
                
@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, InputTareaComponent],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent implements OnInit {

  /*
  @Input() total: number = 0;
  @Input() trabajo: number = 0;
  @Input() descanso: number = 0;
  */
  @Output() actualizarCont = new EventEmitter<any>();
 
  total: number = 0;
  trabajo: number = 0;
  descanso: number = 0;
  filtro: string = 'all';

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

  constructor(private tareasService: TareasService) {

  }

  ngOnInit(): void {
    this.loadData();
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refresh'] && changes['refresh'].currentValue) {
      this.loadData();
    }
    
  }
  
  filtrarTareas(event: Event): void {
    this.filtro = (<HTMLInputElement>event.target).value;
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
    this.total = 0;
    this.trabajo = 0;
    this.descanso = 0;
    this.tareas$ = this.tareasService.getTareaList();
    this.tareas$.subscribe((tareas: Tarea[]) => {
      this.tareasLista = tareas;
      this.tareasLista.forEach(item => {
        if (item.descanso === true) {
          this.descanso++;
        } else {
          this.trabajo++;
        }
        this.total++;
      });
      this.actualizarCont.emit({total: this.total, trabajo: this.trabajo, descanso: this.descanso});
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


