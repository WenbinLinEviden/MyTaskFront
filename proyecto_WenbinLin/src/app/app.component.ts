import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LogComponent } from './log/log.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { HoyComponent } from './hoy/hoy.component';
import { InputTareaComponent } from './input-tarea/input-tarea.component';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, LogComponent, CalendarioComponent, HoyComponent, InputTareaComponent, RouterOutlet, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'proyecto_individual_WenbinLin';
  logged: boolean = false;

  constructor() {
  }

  
}
