import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { StudentsService } from 'src/app/services/students-service.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  public loading: boolean;
  public formSubmitAttempt: boolean;
  filesToUpload: File[];
  responseMsg: any;
  selectedStatus: any
  isWebRequest: boolean = false;
  showPasswordFlag: boolean = false;
  selectedItem = [];
  dropdownList: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  sportList: any = [];
  sportData: any = [];
  SportsListDropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  selectedSportName: any = [];
  multisports: any;
  drodownDatalist=[];
  dropsportData=[];
  

  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
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
      student_password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
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
 
  addClub() {
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
        student_password:this.form.value.student_password
      };
      this._webService.addStudentService(data).subscribe(
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
 
  onItemSelect(item: any, value: any) {
    if (value == 'sport_id') {
      this.selectedSportName.push(item.sport_id);
      this.multisports= this.selectedSportName;
    }

  }

  onItemDeSelect(item: any, value: any) {
    if (value == 'sport_id') {
      let index = this.selectedSportName.findIndex(i => i === item.sport_id);
      this.selectedSportName.splice(index, 1);
   
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
