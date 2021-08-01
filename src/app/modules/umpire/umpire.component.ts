import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth-service.service';
import { MessageService } from 'src/app/services/message-alert.service';
import { UmpiresService } from 'src/app/services/umpire-service.service';
import { DeleteDialogComponent } from '../layout/components/delete-dialog/delete-dialog.component';
import { AddUmpireSportComponent } from './models/add-umpire-sports/add-sports.component';
import { AddUmpireComponent } from './models/add-umpire/add-umpire.component';
import { DeleteUmpireSportComponent } from './models/delete-umpire-sports/delete-sports.component';
import { EditUmpireComponent } from './models/edit-umpire/edit-umpire.component';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-umpire',
  templateUrl: './umpire.component.html',
  styleUrls: ['./umpire.component.css'],
})
export class UmpireComponent implements OnInit {
  eventsCounter: Subject<void> = new Subject<void>();
  umpireList: any = [];
  currentPage = 1;
  totalItems = 0;
  perPage = 0;
  search: any;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private _msgService: MessageService,
    private _webService: UmpiresService,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.perPage = this.authService.perPage;
    this.currentPage = 1;
    this.getUmpireList()
  }
  searchTermChanged: Subject<string> = new Subject<string>();
  searchTasks(event: any) {
    if (this.searchTermChanged.observers.length === 0) {
      this.searchTermChanged
        .pipe(debounceTime(600), distinctUntilChanged())
        .subscribe((term) => {
          // do your code here
          this.currentPage = 1;
          this.getUmpireList();
        });
    }
    this.searchTermChanged.next(event);
  }
  addSport(item: any) {

    const modalRef = this.modalService.open(AddUmpireSportComponent, {
      size: 'md',
      backdrop: 'static',
      windowClass: 'my-class',
      keyboard: false,
    });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.heading = "Assign Sport";
    modalRef.componentInstance.notifyParent.subscribe((result: any) => {
      if (result) {
        this.getUmpireList();
      }
    });
  }
  deleteUmpireSport() {
    const modalRef = this.modalService.open(DeleteUmpireSportComponent, {
      size: 'md',
      backdrop: 'static',
      windowClass: 'my-class',
      keyboard: false,
    });
    modalRef.componentInstance.notifyParent.subscribe((result: any) => {
      if (result) {
        this.getUmpireList();
      }
    });
  }

  addUmpire() {
    const modalRef = this.modalService.open(AddUmpireComponent, {
      size: 'md',
      backdrop: 'static',
      windowClass: 'my-class',
      keyboard: false,
    });
    modalRef.componentInstance.notifyParent.subscribe((result: any) => {
      if (result) {
        // this.spinner.hide();
        this.getUmpireList();
      }
    });
  }
  editUmpires(item) {

    const modalRef = this.modalService.open(EditUmpireComponent, {
      size: 'md',
      backdrop: 'static',
      windowClass: 'my-class',
      keyboard: false,
    });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.heading = "Update Umpire";
    modalRef.componentInstance.notifyParent.subscribe((result: any) => {
      if (result) {
        this.getUmpireList();
      }
    });
  }


  getUmpireList() {
    // this.spinner.show();
    let data = {
      search: this.search,
      pageNumber: this.currentPage,
      numberofRows: this.perPage,
    }
    // this.spinner.show();
    this._webService.allumpires(data).subscribe((response: any) => {
      this.umpireList = [];
      if (response.error) {
        if (response.message) {
          // this._msgService.showalert(response.message, 'error');
        } else {
          this._msgService.showalert(response.data[0]["msg"], 'error');
        }
      } else {
        this.umpireList = response.data;
        this.totalItems = response.total;
        // this.spinner.hide();

      }
    },
      (err: HttpErrorResponse) => {
        // this.spinner.hide();
        if (err.status === 400) {
          this._msgService.showalert(err.error.message, 'error');
          // this.spinner.hide();
        } else {
          // this._msgService.showalert('Server error', 'error');
        }
      });
  }

  deleteUmpires(item: any) {
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

  deleteClubs(item: any) {
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
      umpire_id: item.user_id,
    };
    this._webService.deleteUmpireApi(data).subscribe(
      (response: any) => {

        this._msgService.showalert(response.message, 'success');
        this.getUmpireList();
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
    this.getUmpireList();
  }
  changePerPage(page: number) {
    this.currentPage = 1;
    this.perPage = page;
    this.authService.perPage = this.perPage;
    this.getUmpireList();
  }




}
