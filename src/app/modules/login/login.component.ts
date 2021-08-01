import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { MessageService } from 'src/app/services/message-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public formSubmitAttempt: boolean;
  username: string;
  responseMsg: any;
  public loading: boolean;
  public redirecting: boolean;
  isWebRequest: boolean = false;
  showPasswordFlag: boolean = false;
  constructor(private _formBuilder: FormBuilder,
    private _webService: AuthService, private storageService: StorageService, private _msgService: MessageService,
    public router: Router,private spinner: NgxSpinnerService) {
    this.form = this._formBuilder.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isWebRequest = false;
    this._webService.form_type = "loginpage";
    if (this._webService.getUserTokenFromSorage()) {
      localStorage.clear();
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



  add() {
    this.formSubmitAttempt = true;

    if (this.form.valid) {
      this.isWebRequest = true;
      this.redirecting = false;
      this.loading = true;
      this.router.navigate(['/home']);
      // let user = {
      //   email: this.form.value.email,
      //   password: this.form.value.password,

      // };
      // this._webService.signIn(user).subscribe(
      //   (response: any) => {
      //     this.isWebRequest = false;
      //     if (response.error==false) {
      //       this._msgService.showalert(response.message, 'success');
      //       this._webService.user = response.data;
      //       this._webService.token = response.token;
      //       this._webService.token = response.user_type;
      //       this.storageService.secureStorage.setItem('token', response.token);
      //       this.storageService.secureStorage.setItem('club_id', response.club_id);
      //       this.storageService.secureStorage.setItem('user_type', response.user_type);
      //       this.storageService.secureStorage.setItem('Username', response.Username);
      //       this.isWebRequest = false;
      //       this.router.navigate(['/home']);
      //       // this.spinner.hide();
      //       this.loading = false;
      //       this.redirecting = true;
          
      //     } else {
      //       if (response.message) {
      //         this._msgService.showalert(response.message, 'error');
  
      //         this.loading = false;
      //       } else {
      //         this._msgService.showalert(response.data[0]["msg"], 'error');
  
      //         this.loading = false;
      //       }

      //       this.loading = false;
           
      //     }

      //   },
      //   (err: HttpErrorResponse) => {
      //     this.isWebRequest = false;

      //     this.isWebRequest = false;
      //     this.formSubmitAttempt = false;
      //     if (err.status === 400) {
      //       this._msgService.showalert(err.error.message, 'error');
      //       this.spinner.hide();
      //       this.loading = false;
      //       if (this.formSubmitAttempt == false) {
      //         this.form.reset();
      //       }
      //     } else {
      //       this._msgService.showalert(err.error.message, 'error');
      //       this.spinner.hide();
      //       this.loading = false;
      //       if (this.formSubmitAttempt == false) {
      //         this.form.reset();
      //       }
      //     }
      //     this.isWebRequest = false;
      //   }
      // );
    }
  }

}
