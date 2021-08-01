import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message-alert.service';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  username: string;
  responseMsg: any;
  isWebRequest: boolean;
  @Input() form_type: string = "";
  constructor(private _formBuilder: FormBuilder,
    private _webService: AuthService,
    private _msgService: MessageService,
    private http: Http,
    public router: Router) {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isWebRequest = false;
    this._webService.form_type = "forgetpassword";
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



  add() {
    this.formSubmitAttempt = true;
    // if (this.form.valid) {
    //   this.isWebRequest = true;
    //   let user = {
    //     userId: this.form.value.mobileno,

    //   };
    //   this._webService.forgetPassword(user).subscribe(
    //     (response: any) => {
    //       console.log('forget response ',response);
    //       this._webService.token = response.token;
    //       this._msgService.showalert(response.message, 'success');
    //       this.isWebRequest = false;
    //      },
    //     (err: HttpErrorResponse) => {
    //       if (err.status === 400) {
    //         this._msgService.showalert(err.error.message, 'error');
    //       } else {
    //         this._msgService.showalert('Server error', 'error');
    //       }
    //       this.isWebRequest = false;
    //       this.form.reset();
    //     }
    //   );
    // }
  }



}
