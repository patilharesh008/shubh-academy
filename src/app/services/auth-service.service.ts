import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
import { StorageService } from './storage.service';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const requestOptions = { headers: new HttpHeaders(headerDict), observe: 'response' as 'response' };

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: string;
  name: string;
  user: any;
  userid: any;
  form_type: string;
  user_type: string;
  perPage = 10;
  username:any;
  constructor(private http: HttpClient, public toastr: ToastrManager, private storageService: StorageService) {
    this.user = this.getUserTokenFromSorage();
    this.username = this.getUserNameFormSorage();
  }
  setHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')

  }
  SubmitUserToSorage(user: any) {
  }

  getUserTokenFromSorage() {
    try {
      // console.log("JWT Token==========", this.storageService.secureStorage.getItem('token'));
      return this.storageService.secureStorage.getItem('token');
    } catch (e) {

    }
  }

  getUserIdFromSorage() {
    return this.storageService.secureStorage.getItem('club_id');

  }

  getUserTypeFormSorage() {

    return this.storageService.secureStorage.getItem('user_type');
  }

  getUserNameFormSorage() {
    try {
      return this.storageService.secureStorage.getItem('Username');
    } catch (e) {
      console.log('error');
    }
  }

  signIn(params: any) {
    return this.http.post<any>
      (`${environment.api}/auth/clublogin`,
        params
      );
  }


}
