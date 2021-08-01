import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ToastrManager } from 'ng6-toastr-notifications';
const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const requestOptions = { headers: new HttpHeaders(headerDict), observe: 'response' as 'response' };

@Injectable({
  providedIn: "root"
})
export class DashboardService {

  constructor(private http: HttpClient, public toastr: ToastrManager) {

  }
  setHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')

  }

  //all kpi counts
  allKPICountApi(params: any) {
   return this.http.post<any>(
      `${environment.api}/dashboard`,
     params
  );
}
//user all
allusers(params: any) {
  return this.http.post<any>(
    `${environment.api}/user/userList`,
    params
  );
}
//coach all
allCoaches(params: any) {
return this.http.post<any>(
`${environment.api}/coach/all`,
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
//allgetTodaysRecord
getAllTodaysRecordApi(params: any) {
  return this.http.post<any>(
  `${environment.api}/dashboard/getTodaysRecords`,
  params
  );
  }
}


