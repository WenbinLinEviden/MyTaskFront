import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './log.component.html',
  styleUrl: './log.component.css'
  
})

export class LogComponent {
  formLogin: boolean = true;

  cambioForm(){
    if (this.formLogin)
      this.formLogin=false;
    else
      this.formLogin=true;
  }

  logueo(){
      
  }
  registro(){
    
  }
}
