import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/students-service.service';
import { MessageService } from 'src/app/services/message-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  public loading: boolean;
  @Input() item: any = {};
  form: FormGroup;
  filesToUpload: File[];
  public formSubmitAttempt: boolean;
  selectedStatus: any;
  viewImgUrl: string;
  responseMsg: any;
  isWebRequest: boolean = false;
  requiredField: boolean = false;
  sportList: any = [];
  sportData: any = [];
  selectedItem = [];
  dropdownList: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  SportsListDropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  selectedSportName: any = [];
  bindstatus: any;
  sportNameList: any;
  bindSelectForSport: any[];
  drodownDatalist = [];
  dropsportData = [];
  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _msgService: MessageService,
    private _webService: StudentsService,
    private storageService: StorageService,

  ) {
    this.form = this._formBuilder.group({
      student_name: [null, [Validators.required, Validators.maxLength(50)]],
      student_email: [null, [Validators.required, Validators.email]],
      student_mobile: [null, [Validators.required, Validators.minLength(10),Validators.pattern('[6789][0-9]{9}'), Validators.maxLength(10)]],
      student_address: [null, [Validators.required]],
      contact_person : [null, [Validators.required]],
      city : [null, [Validators.required]],

    });
  }

  ngOnInit() {
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
    this.dropdownList = [
      { item_id: 1, item_text: 'Active' },
      { item_id: 0, item_text: 'Inactive' },];
    this.selectedItem = [];
    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.form.patchValue({
      student_name: this.item.student_name,
      student_email: this.item.student_email,
      student_mobile: this.item.student_mobile,
      contact_person: this.item.contact_person,
      city: this.item.city,
      student_address:this.item.student_address
    });
    this.selectedStatus = this.item.is_active;
    if (this.item.is_active) {

      var bindstatus = this.dropdownList.find(x => x.item_text == this.item.is_active.toString().trim()).item_id;

      this.form.controls['is_active'].setValue([{ item_id: bindstatus, item_text: this.item.is_active }]);
    }

  }

  get f() {
    return this.form.controls;
  }
  isFieldValid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (!this.form.get(field).valid && this.form.get(field).untouched && this.formSubmitAttempt)

    );
  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  updateStudent() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.isWebRequest = true;
      this.loading=true;
      let data = {
        student_name: this.form.value.student_name,
        student_email: this.form.value.student_email,
        student_mobile: this.form.value.student_mobile,
        contact_person: this.form.value.contact_person,
        city: this.form.value.city,
        user_id: this.item.user_id,
      };
      this._webService.updateStudentService(data).subscribe(
        (response: any) => {
          if (response.error == false) {
            this.loading=false;
            this._msgService.showalert(response.message, 'success');
            this.isWebRequest = false;
            this.activeModal.dismiss();
            this.notifyParent.emit(true);
          } else if (response.message) {
            this._msgService.showalert(response.message, 'error');
            this.loading=false;
            this.isWebRequest = false;
          }

        },
        (err: HttpErrorResponse) => {
          this.loading=false;
          if (err.status === 400) {
            this._msgService.showalert(err.error.message, 'error');
          } else {
            this._msgService.showalert('Server error', 'error');
          }
          this.isWebRequest = false;
          this.activeModal.dismiss();
          this.notifyParent.emit(false);
        }
      )
    }
  }
  onFileChange(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  // getSportList() {
  //   let data = {
  //   }
  //   this._webService.allMastersSport(data).subscribe((response: any) => {
  //     this.drodownDatalist = response.data;
  //     this.drodownDatalist.forEach(element => {
  //       var v = { "sport_id": element.sport_id, "sport_name": element.sport_name };
  //       this.dropsportData.push(v);
  //     });
  //     this.drodownDatalist = this.dropsportData;

  //   },
  //     (err: HttpErrorResponse) => {
  //       if (err.status === 400) {
  //         this._msgService.showalert(err.error.message, 'error');
  //       } else {
  //         this._msgService.showalert('Server error', 'error');
  //       }
  //     });
  // }

  onItemDeSelect(item: any, value: any) {
    if (value == 'sport_id') {
      this.selectedSportName = this.selectedSportName.filter((value: any) => {
        return value != item.sport_id;
      });
    }

    else if (value == 'is_active') {
      this.selectedStatus = ''
    }
  }

  onItemSelect(item: any, value: any) {
    if (value == 'sport_id') {
      this.selectedSportName.push(item.sport_id);
      console.log("club sport_id multiple",this.selectedSportName);
    }
    else if (value == 'is_active') {
      this.selectedStatus = item.item_text;
    }
  }

  selectAllCategories(data) {
    this.selectedSportName = [];
    data.forEach(item => {
      this.selectedSportName.push(item.sport_id);
    });
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  close() {
    this.activeModal.dismiss();
    this.notifyParent.emit(false);
  }

}
