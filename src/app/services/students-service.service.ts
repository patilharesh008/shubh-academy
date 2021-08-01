import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
import { StorageService } from './storage.service';
import { ExportToCsv } from "export-to-csv";
const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const requestOptions = { headers: new HttpHeaders(headerDict), observe: 'response' as 'response' };

@Injectable({
  providedIn: "root"
})
export class StudentsService {

  constructor(private http: HttpClient, public toastr: ToastrManager, private storageService: StorageService) {

  }
  setHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')

  }

  //create Student
  addStudentService(params: any) {
    return this.http.post<any>(
      `${environment.api}/student/`,
      params
    );
  }
  //update Student
  updateStudentService(params: any) {
    return this.http.post<any>(
      `${environment.api}/student/update`,
      params
    );
  }
  //Find  all Student
  allStudentService(params: any) {
    return this.http.post<any>(
      `${environment.api}/student/all`,
      params
    );
  }

  //delete club
  deleteStudentService(params: any) {
    return this.http.post<any>(
      `${environment.api}/student/delete`,
      params

    );
  }
}
