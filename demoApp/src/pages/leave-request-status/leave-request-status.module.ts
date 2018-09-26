import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveRequestStatusPage } from './leave-request-status';

@NgModule({
  declarations: [
    LeaveRequestStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveRequestStatusPage),
  ],
})
export class LeaveRequestStatusPageModule {}
