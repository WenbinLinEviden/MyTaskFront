import { Routes } from '@angular/router';
import { HoyComponent } from './hoy/hoy.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { LogComponent } from './log/log.component';
import { InputTareaComponent } from './input-tarea/input-tarea.component';

export const routes: Routes = [
    { path: 'hoy', component: HoyComponent },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'log', component: LogComponent },
    { path: 'input-tarea', component: InputTareaComponent },
    { path: '', redirectTo: '/input-tarea', pathMatch: 'full' }
];
