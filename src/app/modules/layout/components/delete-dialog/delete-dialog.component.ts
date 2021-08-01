import { Component, OnInit,EventEmitter, Output, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  @Input() heading: any;
  constructor(private activeModal: NgbActiveModal,private _formBuilder: FormBuilder,) {

  }

  ngOnInit(): void {
    console.log('heading ',this.heading);
     }

 delete()
 {
   this.activeModal.dismiss();
   this.notifyParent.emit(true);

 }

  close() {
    this.activeModal.dismiss();
    this.notifyParent.emit(false);
  }


  




}
