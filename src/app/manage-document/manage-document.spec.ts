import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocument } from './manage-document';

describe('ManageDocument', () => {
  let component: ManageDocument;
  let fixture: ComponentFixture<ManageDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDocument],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
