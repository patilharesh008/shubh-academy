import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUmpireComponent } from './edit-umpire.component';


describe('EditUmpireComponent', () => {
  let component: EditUmpireComponent;
  let fixture: ComponentFixture<EditUmpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUmpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUmpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
