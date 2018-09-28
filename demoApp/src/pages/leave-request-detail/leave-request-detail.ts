import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import { ToastController,LoadingController  } from 'ionic-angular';
import { stringify } from '@angular/core/src/render3/util';

/**
 * Generated class for the LeaveRequestDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave-request-detail',
  templateUrl: 'leave-request-detail.html',
})
export class LeaveRequestDetailPage {

  name;
  desc;
  toDate;
  fromDate;
  employee;
  employeeId;
  leaveId;
  loading: any;
  resp:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider : RestProvider,private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaveRequestDetailPage');
    this.desc = this.navParams.get('leave').desc;
    this.toDate = this.navParams.get('leave').to;
    this.fromDate = this.navParams.get('leave').from;
    this.employeeId = this.navParams.get('leave').employeeId;
    this.getEmployee(this.employeeId);
    this.leaveId = this.navParams.get('leave').id;
  }


  getEmployee(employeeId){
    this.restProvider.getEmployee(employeeId).then(data =>{
        this.employee = data;
        this.name = this.employee.name;
    }) 
  }

  leaveApproval(id,status){
    this.showLoader();
    this.restProvider.leaveApproval(id,status).then(data =>{
      console.log(data);
      this.loading.dismiss();
     // this.resp=data;
    
      let toast = this.toastCtrl.create({
        message:'Leave request status updated successfully',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
      this.navCtrl.popToRoot();

    })
      
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Submitting...'
    });
  
    this.loading.present();
  }



  


}
