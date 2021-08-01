import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/share.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
  

@NgModule({
  declarations: [LoginComponent],
  imports: [
    
    LoginRoutingModule,
    SharedModule,
  ]
})
export class LoginModule { }
