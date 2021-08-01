import { Component, OnInit,EventEmitter, Output, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-approve-reject-dialog',
  templateUrl: './approve-reject-dialog.component.html',
  styleUrls: ['./approve-reject-dialog.component.css']
})
export class ApproveRejectDialogComponent implements OnInit {
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  @Input() approve: any;
  constructor(private activeModal: NgbActiveModal,private _formBuilder: FormBuilder,) {

  }


  ngOnInit(): void {
    console.log('approve ',this.approve);
     }

 confirm()
 {
   this.activeModal.dismiss();
   this.notifyParent.emit(true);

 }

  close() {
    this.activeModal.dismiss();
    this.notifyParent.emit(false);
  }

}
