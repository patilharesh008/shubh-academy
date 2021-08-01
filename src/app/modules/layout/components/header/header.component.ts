import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import * as moment from "moment";
import { DOCUMENT } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  arieaExpand: Boolean = false;
  memberSince: string;
  username:any;
  role:any;
  constructor(@Inject(DOCUMENT) private document: Document, private _webService: AuthService, private storageService: StorageService, public nav: Router, private renderer: Renderer2) { }


  ngOnInit(): void {
    this.username =this.storageService.secureStorage.getItem('Username');
    console.log("Header--->---->", this.username);
    this.role =this.storageService.secureStorage.getItem('user_type');
  }
  
  openProfile(value) {
    this.arieaExpand = !value;
    console.log("f---->", value)
  }

  logout() {
    localStorage.clear();
    this.nav.navigate(['/login'])
    this.renderer.addClass(this.document.body, 'login-page');
    this.renderer.removeClass(this.document.body, 'skin-blue');
    this.renderer.removeClass(this.document.body, 'sidebar-mini');
  }
}