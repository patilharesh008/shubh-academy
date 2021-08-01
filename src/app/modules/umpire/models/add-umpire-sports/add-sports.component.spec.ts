import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUmpireSportComponent } from './add-sports.component';





describe('AddUmpireSportComponent', () => {
  let component: AddUmpireSportComponent;
  let fixture: ComponentFixture<AddUmpireSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUmpireSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUmpireSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
