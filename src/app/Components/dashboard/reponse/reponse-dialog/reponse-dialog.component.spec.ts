import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseDialogComponent } from './reponse-dialog.component';

describe('ReponseDialogComponent', () => {
  let component: ReponseDialogComponent;
  let fixture: ComponentFixture<ReponseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReponseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
