import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentMenu = 'dashboard';
  userName: any;
  responseMsg: any;
  role: any;
  username:any;
  webPages=[];
  constructor(private authService: AuthService,private storageService:StorageService) { }

  
  ngOnInit(): void {
    this.userName =this.storageService.secureStorage.getItem('Username');
    console.log("sidebar--->----> Username", this.userName);
    this.username =this.storageService.secureStorage.getItem('user_name');
    console.log("sidebar username--->---->", this.username);
    this.role =this.storageService.secureStorage.getItem('user_type');
    console.log("sidebar role--->---->", this.role);
    // this.role= this.authService.user.role;
    // this.userName = this.authService.user["name"];
    // console.log("--->", this.authService["user"]);
    // if(this.role=="admin"){

    //  // this.getWebPages();
    // }
  }

  setCurrentMenu(menu : string){
    this.currentMenu = menu;
  }
}
