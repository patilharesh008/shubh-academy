import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/share.module';
import { FooterComponent } from './components/footer/footer.component';
import { ApproveRejectDialogComponent } from './components/approve-reject-dialog/approve-reject-dialog.component';
@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent,FooterComponent, ApproveRejectDialogComponent],
  imports: [LayoutRoutingModule, SharedModule]
})
export class LayoutModule {}
