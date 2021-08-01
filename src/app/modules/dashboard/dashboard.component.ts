import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'src/app/services/message-alert.service';
import { environment } from 'src/environments/environment';
import { DashboardService } from 'src/app/services/dashboard-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  allkpiCountsList:any=[];
  clubsCount=0;
  sportsCount=0;
  usersCount=0;
  coachesCount=0;
  batchesCount=0;
  umpireCount=0;
  allUsersList = [];
  allUmpiresList = [];
  // allCoachesList = [];
  coachesList: any = [];
  alltodaysRecordList:any=[];
  allCoachesDeatils:any=[];
  allUmpireDetails:any=[];
  role: any;
  currentPage = 1;
  perPage = 0;
  search: string = '';
  allUsersDetails=[];
  club_id: any;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private _msgService: MessageService,
    private _webService:DashboardService,
    private storageService:StorageService

  ) { }

  ngOnInit(): void {
    this.perPage = this.authService.perPage;
    this.currentPage = 1;
    this.role =this.storageService.secureStorage.getItem('user_type');
    this.club_id =this.storageService.secureStorage.getItem('club_id');
    this.clubsCount=0;
    this.sportsCount=0;
    this.usersCount=0;
    this.coachesCount=0;
    this.batchesCount=0;
    this.umpireCount=0;
    this.getallkpiCountsList();
    this.getallTodaysList();
  }

  getallkpiCountsList() {
    let data = {
      club_id: this.storageService.secureStorage.getItem('club_id'),
    }
    this._webService.allKPICountApi(data).subscribe((response: any) => {
      this.allkpiCountsList = [];
      if (response.error) {
        if (response.message) {
          // this._msgService.showalert(response.message, 'error');
        } else {
          this._msgService.showalert(response.data[0]["msg"], 'error');
        }
      } else {
        this.allkpiCountsList = response.data;
        this.clubsCount=response.data[0].clubs;
        this.sportsCount=response.data[0].sports;
        this.usersCount=response.data[0].users;
        this.coachesCount=response.data[0].coaches;
        this.umpireCount=response.data[0].umpires;
        this.batchesCount=response.data[0].batches;
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


  getallTodaysList() {
    let data = {
      club_id: this.storageService.secureStorage.getItem('club_id'),
    }
    this._webService.getAllTodaysRecordApi(data).subscribe((response: any) => {
      this.alltodaysRecordList = [];
      if (response.error) {
        if (response.message) {
          // this._msgService.showalert(response.message, 'error');
        } else {
          this._msgService.showalert(response.data[0]["msg"], 'error');
        }
      } else {
        this.allUsersDetails=response.user;
        this.allCoachesDeatils=response.coach;
        this.allUmpireDetails=response.umpire
       
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
 

}
