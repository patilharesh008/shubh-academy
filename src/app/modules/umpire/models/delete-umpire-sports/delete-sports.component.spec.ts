import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteUmpireSportComponent } from './delete-sports.component';






describe('DeleteUmpireSportComponent', () => {
  let component: DeleteUmpireSportComponent;
  let fixture: ComponentFixture<DeleteUmpireSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUmpireSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUmpireSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
