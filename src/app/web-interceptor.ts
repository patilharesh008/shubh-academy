import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { environment } from '../environments/environment'
import { AuthService } from './services/auth-service.service';
import { StorageService } from "./services/storage.service";


@Injectable()
export class WebInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private authService: AuthService,private storageService:StorageService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let updatedRequest = request;
    if (this.authService.getUserTokenFromSorage()) {
      updatedRequest = request.clone({
        setHeaders: {
          token: this.authService.getUserTokenFromSorage(),
          club_id:''+this.storageService.secureStorage.getItem('club_id'),
        }
      });
   
    }
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            if (!environment.production) {
            }
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error instanceof HttpErrorResponse) {
            if (!environment.production) console.log("api call error :", error);
            if (error.status === 401) {
              this._router.navigate([""]);
            }
          }
        }
      )
    );
  }
}