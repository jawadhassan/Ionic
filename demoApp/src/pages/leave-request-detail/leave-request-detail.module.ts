import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveRequestDetailPage } from './leave-request-detail';

@NgModule({
  declarations: [
    LeaveRequestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveRequestDetailPage),
  ],
})
export class LeaveRequestDetailPageModule {}
