import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth-service.service';
import { StudentsService } from 'src/app/services/students-service.service';
import { MessageService } from 'src/app/services/message-alert.service';
import { environment } from 'src/environments/environment';
import { DeleteDialogComponent } from '../layout/components/delete-dialog/delete-dialog.component';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { AddStudentComponent } from './models/add-student/add-student.component';
import { EditStudentComponent } from './models/edit-student/edit-student.component';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  eventsCounter: Subject<void> = new Subject<void>();
  private ngUnsubscribe = new Subject();
  currentPage = 1;
  perPage = 0;
  studentsDataList: any = [];
  search: string = '';
  viewImgUrl: string;
  totalItems=0;
  constructor(
    private modalService: NgbModal,
    private _msgService: MessageService,
    private authService: AuthService,
    private _webService: StudentsService,
  ) { }
  ngOnInit(): void {
    this.perPage = this.authService.perPage;
    this.currentPage = 1;
    this.viewImgUrl = environment.imgUrl;
    this.getstudentsAllList();
  }
  searchTermChanged: Subject<string> = new Subject<string>();
  searchTasks(event: any) {
    if (this.searchTermChanged.observers.length === 0) {
      this.searchTermChanged
        .pipe(debounceTime(600), distinctUntilChanged())
        .subscribe((term) => {
          // do your code here
          this.currentPage = 1;
          this.getstudentsAllList();
        });
    }
    this.searchTermChanged.next(event);
  }

  addStudentData() {
    const modalRef = this.modalService.open(AddStudentComponent, {
      size: 'md',
      backdrop: 'static',
      windowClass: 'my-class',
      keyboard: false,
    });
    modalRef.componentInstance.notifyParent.subscribe((result: any) => {
      if (result) {
        this.getstudentsAllList();
      }
    });
  }
  editStudentData(item: any) {

    const modalRef = this.modalService.open(EditStudentComponent, {
      size: 'md',
      backdrop: 'static',
      windowClass: 'my-class',
      keyboard: false,
    });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.heading = "Update Club";
    modalRef.componentInstance.notifyParent.subscribe((result: any) => {
      if (result) {
        this.getstudentsAllList();
      }
    });
  }

  getstudentsAllList() {
    let data = {
      search:this.search,
      pageNumber:this.currentPage,
      numberofRows:this.perPage,
    }
    this._webService.allStudentService(data).subscribe((response: any) => {
      this.studentsDataList = [];
      if (response.error==true) {
        if (response.message) {
          // this._msgService.showalert(response.message, 'error');
        } else {
          this._msgService.showalert(response.data[0]["msg"], 'error');
        }
      } else {
        this.studentsDataList = response.data;
        this.totalItems=response.total;
        
      }
    },
      (err: HttpErrorResponse) => {

        if (err.status === 400) {
          this._msgService.showalert(err.error.message, 'error');
  
        } else {
          // this._msgService.showalert('Server error', 'error');
        }
      });
  }
 
  deleteStudents(item: any) {
    const modalRef = this.modalService.open(DeleteDialogComponent, {
      size: "sm",
      backdrop: "static",
      windowClass: "my-class",
      keyboard: false,
    });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.notifyParent.subscribe((result: boolean) => {

      if (result) {
        this.delete(item);

      }

    })
  }
  delete(item) {
    let data = {
      user_id: item.user_id,
    };
    this._webService.deleteStudentService(data).subscribe(
      (response: any) => {

        this._msgService.showalert(response.message, 'success');
        this.getstudentsAllList();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this._msgService.showalert(err.error.message, 'error');
        } else {
          this._msgService.showalert('Server error', 'error');
        }
      }
    );
  }

  pager(page: number) {
    this.currentPage = page;
    this.getstudentsAllList();
  }
  
  changePerPage(page: number) {
    this.currentPage = 1;
    this.perPage = page;
    this.authService.perPage = this.perPage;
    this.getstudentsAllList();
  }


}
