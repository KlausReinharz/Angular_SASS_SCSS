import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutierComponent } from './recrutier.component';

describe('RecrutierComponent', () => {
  let component: RecrutierComponent;
  let fixture: ComponentFixture<RecrutierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecrutierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecrutierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
