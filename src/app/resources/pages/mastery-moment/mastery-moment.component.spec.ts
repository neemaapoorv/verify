import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryMomentComponent } from './mastery-moment.component';

describe('MasteryMomentComponent', () => {
  let component: MasteryMomentComponent;
  let fixture: ComponentFixture<MasteryMomentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasteryMomentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
