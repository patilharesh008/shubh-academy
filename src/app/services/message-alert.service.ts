import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from "@angular/common/http";
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
export class MessageService {
  constructor(public toastr: ToastrManager) {


  }

  showalert(message: string, type: string) {
    if (type == "success")
      this.toastr.successToastr(message, "Success!", {
        position: "top-center",
        animate: "slideFromBottom",
        toastTimeout: 2000
      });
    else
      this.toastr.errorToastr(message, "Error!", {
        position: "top-center",
        animate: "slideFromBottom",
        toastTimeout: 3000
      });
  }

}
