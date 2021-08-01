import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/share.module';
import { AddUmpireSportComponent } from './models/add-umpire-sports/add-sports.component';
import { AddUmpireComponent } from './models/add-umpire/add-umpire.component';
import { DeleteUmpireSportComponent } from './models/delete-umpire-sports/delete-sports.component';
import { EditUmpireComponent } from './models/edit-umpire/edit-umpire.component';
import { UmpiresRoutingModule } from './umpire-routing.module';
import { UmpireComponent } from './umpire.component';

@NgModule({
  declarations: [UmpireComponent,AddUmpireComponent,EditUmpireComponent,AddUmpireSportComponent,DeleteUmpireSportComponent],
  imports: [
    SharedModule,
    UmpiresRoutingModule,
  ],entryComponents:[AddUmpireComponent,EditUmpireComponent,AddUmpireSportComponent,DeleteUmpireSportComponent]
})
export class UmpiresModule { }
