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
export class UmpiresService {
  constructor(private http: HttpClient, public toastr: ToastrManager, private storageService: StorageService) {

  }
  setHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')

  }

  //create Umpire
  addUmpireapi(params: any) {
    return this.http.post<any>(
      `${environment.api}/umpire`,
      params
    );
  }
  //update umpire
  updateumpireapi(params: any) {
    return this.http.post<any>(
      `${environment.api}/umpire/update`,
      params
    );
  }
  //umpire all
  allumpires(params: any) {
    return this.http.post<any>(
      `${environment.api}/umpire/all`,
      params
    );
  }
  //assign sport to umpire 
  assignSportToUmpireApi(params: any) {
    return this.http.post<any>(
      `${environment.api}/umpire/assignSportsToUmpire`,
      params
    );
  }
  //find all-sports 
  allsports(params: any) {
    return this.http.post<any>(
      `${environment.api}/sport/dropdownFindAll`,
      params
    );
  }
      //sport Api
      addSportApi(params: any) {
        return this.http.post<any>(
          `${environment.api}/sport`,
          params
        );
      }

//delete sportApi
deleteSportApi(params: any){
  return this.http.post<any>(
    `${environment.api}/sport/delete`,
    params

  );
}
  //delete Umpire
  deleteUmpireApi(params: any) {
    return this.http.post<any>(
      `${environment.api}/umpire/delete`,
      params

    );
  }
}
