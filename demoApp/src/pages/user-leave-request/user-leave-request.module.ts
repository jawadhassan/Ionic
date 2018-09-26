import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLeaveRequestPage } from './user-leave-request';

@NgModule({
  declarations: [
    UserLeaveRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLeaveRequestPage),
  ],
})
export class UserLeaveRequestPageModule {}
