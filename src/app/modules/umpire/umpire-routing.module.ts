import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UmpireComponent } from './umpire.component';




const routes: Routes = [
  {
    path: '',
    component: UmpireComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UmpiresRoutingModule {}
