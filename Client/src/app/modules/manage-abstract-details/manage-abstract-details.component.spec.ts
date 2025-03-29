import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAbstractDetailsComponent } from './manage-abstract-details.component';

describe('ManageAbstractDetailsComponent', () => {
  let component: ManageAbstractDetailsComponent;
  let fixture: ComponentFixture<ManageAbstractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAbstractDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAbstractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
