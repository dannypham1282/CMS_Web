import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogComponent } from './alert-dialog';

describe('AlertDialog', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
