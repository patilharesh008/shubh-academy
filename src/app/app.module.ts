import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { ToastrModule } from "ng6-toastr-notifications";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from './modules/shared/share.module';
import { WebInterceptor } from './web-interceptor';
import { AuthGuardService } from './modules/auth/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,

  ],

  providers: [AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
