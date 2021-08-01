import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUmpireComponent } from './add-umpire.component';




describe('AddUmpireComponent', () => {
  let component: AddUmpireComponent;
  let fixture: ComponentFixture<AddUmpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUmpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUmpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
