import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UmpireComponent } from './umpire.component';



describe('UmpireComponent', () => {
  let component: UmpireComponent;
  let fixture: ComponentFixture<UmpireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmpireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmpireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
