import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTareaComponent } from './input-tarea.component';

describe('InputTareaComponent', () => {
  let component: InputTareaComponent;
  let fixture: ComponentFixture<InputTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
