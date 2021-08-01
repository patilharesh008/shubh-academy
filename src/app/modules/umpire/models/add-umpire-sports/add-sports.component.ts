import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message-alert.service';
import { DeleteDialogComponent } from 'src/app/modules/layout/components/delete-dialog/delete-dialog.component';
import { UmpiresService } from 'src/app/services/umpire-service.service';

@Component({
  selector: 'app-add-sports',
  templateUrl: './add-sports.component.html',
  styleUrls: ['./add-sports.component.css'],
})
export class AddUmpireSportComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  form: FormGroup;
  public formSubmitAttempt: boolean;
  public loading: boolean;
  user_id: any;
  responseMsg: any;
  requiredField: boolean = false;
  selectedItem = [];
  isWebRequest: boolean = false;
  submitted = false;
  dropdownList: { item_id: number; item_text: string; }[];
  SportsListDropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  closeDropdownSelection: false;
  disabled = false;
  sportData = []
  selectedSportName = [];
  multisports: any;
  drodownDatalist = [];
  dropsportData = [];
  bindSelectForSport = [];
  sportNameList: any;
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    public router: Router,
    private _msgService: MessageService,
    private _webService: UmpiresService,

  ) {
    this.form = this._formBuilder.group({
      sport_id: [null, [Validators.required]],
    });

  }

  ngOnInit() {
    this.getSportList();
    this.isWebRequest = false;
    this.SportsListDropdownSettings = {
      singleSelection: false,
      idField: "sport_id",
      textField: "sport_name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.selectedSportName = this.item.sport_id;
    this.sportNameList = this.item.sportDetails
    this.selectedSportName = [
      { "sport_id": this.sportNameList.sport_id, "sport_name": this.sportNameList.sport_name }
    ];
    this.bindSelectForSport = [];
    if (this.item.sportDetails != null && this.item.sportDetails.length > 0) {
      this.item.sportDetails.forEach(element => {
        if (element.sport_id) {

          var item = { "sport_id": element.sport_id, "sport_name": element.sport_name };
          this.selectedSportName.push(element.sport_id);
          this.bindSelectForSport.push(item);
        }
      });
    }

  }
  get f() {
    return this.form.controls;
  }
  isFieldValid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  addsports() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      let sports_ids = [];
      let count = 0;
      for (let i = 0; i < this.bindSelectForSport.length; i++) {
        sports_ids.push(this.bindSelectForSport[i].sport_id)
        count++;
        if (count == this.bindSelectForSport.length) {
          this.isWebRequest = true;
          this.loading = true;
          let data = {
            sport_id: JSON.stringify(this.selectedSportName),
            umpire_id: this.item.umpire_master_id
          };
          this._webService.assignSportToUmpireApi(data).subscribe(
            (response: any) => {
              if (response.error == false) {
                this.loading = false;
                this._msgService.showalert(response.message, 'success');
                this.isWebRequest = false;
                this.activeModal.dismiss();
                this.notifyParent.emit(true);
                this.loading = false;
              } else if (response.message) {
                this._msgService.showalert(response.message, 'error');
                this.loading = false;
                this.isWebRequest = false;
              }

            },
            (err: HttpErrorResponse) => {
              this.loading = false;
              if (err.status === 400) {
                this._msgService.showalert(err.error.message, 'error');
              } else {
                this._msgService.showalert('Server error', 'error');
              }
              this.isWebRequest = false;
              this.activeModal.dismiss();
              this.notifyParent.emit(false);
            }
          );
        }
      }
    }
  }

  getSportList() {
    let data = {
    }
    this._webService.allsports(data).subscribe((response: any) => {
      this.drodownDatalist = response.data;
      this.drodownDatalist.forEach(element => {
        var v = { "sport_id": element.sport_id, "sport_name": element.sport_name };
        this.dropsportData.push(v);
      });
      this.drodownDatalist = this.dropsportData;

    },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this._msgService.showalert(err.error.message, 'error');
        } else {
          this._msgService.showalert('Server error', 'error');
        }
      });
  }
  deleteAssignSport() {

    const modalRef = this.modalService.open(DeleteDialogComponent, {
      size: "sm",
      backdrop: "static",
      windowClass: "my-class",
      keyboard: false,
    });
    // modalRef.componentInstance.item = item;
    modalRef.componentInstance.notifyParent.subscribe((result: boolean) => {

      if (result) {
        // this.delete(item);

      }

    })
  }


  onItemSelect(item: any, value: any) {
    if (value == 'sport_id') {
      this.selectedSportName.push(item.sport_id);
    }
  }

  onItemDeSelect(item: any, value: any) {
    if (value == 'sport_id') {
      this.selectedSportName = this.selectedSportName.filter((value: any) => {
        return value != item.sport_id;
      });
    }
  }
  selectAllCategories(data) {
    this.selectedSportName = [];
    data.forEach(item => {
      this.selectedSportName.push(item.sport_id);
    });
  }

  close() {
    this.activeModal.dismiss();
    this.notifyParent.emit(false);
  }

}

