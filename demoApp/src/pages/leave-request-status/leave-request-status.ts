import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LeaveRequestStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-request-status',
  templateUrl: 'leave-request-status.html',
})
export class LeaveRequestStatusPage {

  name;
  desc;
  toDate;
  fromDate;
  status
  leaveId;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.desc = this.navParams.get('leave').desc;
    this.toDate = this.navParams.get('leave').to;
    this.fromDate = this.navParams.get('leave').from;
    this.leaveId = this.navParams.get('leave').id;
    this.status = this.navParams.get('leave').status;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveRequestStatusPage');
  }

}
