import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-sports',
  templateUrl: './delete-sports.component.html',
  styleUrls: ['./delete-sports.component.css'],
})
export class DeleteUmpireSportComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  public formSubmitAttempt: boolean;
  responseMsg: any;
  requiredField: boolean = false;
  selectedItem = [];
  showPasswordFlag: boolean = false;
  isWebRequest: boolean = false;
  selectedStatus: any;
  submitted = false;
  dropdownList: { item_id: number; item_text: string; }[];
  dropdownSettings: { singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; };
  closeDropdownSelection: false;
  disabled = false;
  constructor(
    private activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    public router: Router
  ) {
    this.form = this._formBuilder.group({
      sport_name: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.isWebRequest = false;
    this.dropdownList = [
      { item_id: 1, item_text: 'Cricket' },
      { item_id: 2, item_text: 'Football' },];
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

  editsports() {
    this.formSubmitAttempt = true;
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onItemSelect(item: any) {
    this.selectedStatus = item.item_text;
  }
  onItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  close() {
    this.activeModal.dismiss();
    this.notifyParent.emit(false);
  }


}
