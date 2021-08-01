import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth.guard';


import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule,
          ), 
          // canActivate: [AuthGuardService]
      },
      {
        path: 'student',
        loadChildren: () =>
          import('../student/student.module').then(
            (m) => m.StudentsModule
          ),
          // canActivate: [AuthGuardService]
      },
      {
        path: 'umpire',
        loadChildren: () =>
          import('../umpire/umpire.module').then(
            (m) => m.UmpiresModule
          ),canActivate: [AuthGuardService]
      },

    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
