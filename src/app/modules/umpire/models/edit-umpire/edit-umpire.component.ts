import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message-alert.service';
import { UmpiresService } from 'src/app/services/umpire-service.service';

@Component({
  selector: 'app-edit-umpire',
  templateUrl: './edit-umpire.component.html',
  styleUrls: ['./edit-umpire.component.css'],
})
export class EditUmpireComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() item: any = {};
  form: FormGroup;
  public formSubmitAttempt: boolean;
  public loading: boolean;
  selectedStatus: any;
  responseMsg: any;
  isWebRequest: boolean = false;
  requiredField: boolean = false;
  selectedItem = [];
  dropdownList: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  closeDropdownSelection: false;
  disabled = false;
  bindstatus: any;
  age: any;
  showAge: number;
  ageCal: any;
  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _msgService: MessageService,
    private _webService: UmpiresService,
  ) {
    this.form = this._formBuilder.group({
      umpire_name: [null, [Validators.required, Validators.maxLength(50)]],
      umpire_email: [null, [Validators.required, Validators.email]],
      birth_date: [null, [Validators.required]],
      umpire_age: [null, [Validators.required]],
      umpire_mobile: [null, [Validators.required, Validators.minLength(10), Validators.pattern('[6789][0-9]{9}'), Validators.maxLength(10)]],
      is_active: [null, [Validators.required]]
    });
  }



  ngOnInit() {
    this.showAge = this.item.umpire_age
    this.isWebRequest = false;
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
      umpire_name: this.item.umpire_name,
      umpire_email: this.item.umpire_email,
      umpire_mobile: this.item.umpire_mobile,
      umpire_age: this.item.umpire_age,
      birth_date: this.item.birth_date,
    });
    this.selectedStatus = this.item.is_active;
    if (this.item.is_active) {

      var bindstatus = this.dropdownList.find(x => x.item_text == this.item.is_active.toString().trim()).item_id;

      this.form.controls['is_active'].setValue([{ item_id: bindstatus, item_text: this.item.is_active }]);
    }
    

  }
  ageCalculator(e: any) {
    this.ageCal = e.target.value;
    if (this.ageCal) {
      const convertAge = new Date(this.ageCal);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
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


  updateUmpire() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.isWebRequest = true;
      this.loading = true;
      let data = {
        umpire_name: this.form.value.umpire_name,
        umpire_email: this.form.value.umpire_email,
        umpire_mobile: this.form.value.umpire_mobile,
        umpire_age: this.showAge,
        birth_date: this.form.value.birth_date,
        is_active: this.selectedStatus,
        umpire_id: this.item.user_id,
      };
      this._webService.updateumpireapi(data).subscribe(
        (response: any) => {
          if (response.error == false) {
            this.loading=false;
            this._msgService.showalert(response.message, 'success');
            this.isWebRequest = false;
            this.activeModal.dismiss();
            this.notifyParent.emit(true);
            this.loading=false;
          } else  {
            this._msgService.showalert(response.message, 'error');
            this.loading=false;
            this.isWebRequest = false;
          }

        },
        (err: HttpErrorResponse) => {
          this.loading = false
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
  onItemSelect(item: any) {
    this.selectedStatus = item.item_text;
  }
  onItemDeSelect(item: any) {
    this.selectedStatus = ''
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}
