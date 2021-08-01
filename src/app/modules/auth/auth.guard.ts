import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';



@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,public secure:StorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       
        if (this.secure.secureStorage.getItem("token")) {
            return true;
        } else {
            this.router.navigate(['/'] 
               
            );
            return false;
        }
    }
}