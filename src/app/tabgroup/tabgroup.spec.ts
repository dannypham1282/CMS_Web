import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabgroup } from './tabgroup';

describe('Tabgroup', () => {
  let component: Tabgroup;
  let fixture: ComponentFixture<Tabgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tabgroup],
    }).compileComponents();

    fixture = TestBed.createComponent(Tabgroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
