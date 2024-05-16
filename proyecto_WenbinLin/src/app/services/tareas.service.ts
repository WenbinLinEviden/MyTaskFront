import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../models/tarea';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) { }

  getTareaList(): any {
    return this.http.get('http://localhost:8080/1/1/tareaOrdenada');
  }

  getTarea(id: number): any {
    return this.http.get(`http://localhost:8080/1/1/${id}`);
  }

  postTarea(tarea: Omit<Tarea, 'id'>): Observable<Tarea> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Tarea>("http://localhost:8080/1/1/new", tarea, httpOptions);
  }

  putTarea(tarea: Tarea, id: number): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Tarea>(`http://localhost:8080/1/1/${id}/update`, tarea, httpOptions);
  }

  deleteTarea(id: number): any {
    console.log("eliminar "+id);
    return this.http.delete(`http://localhost:8080/1/1/${id}/delete`);
  }
}
