import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import {RestProvider} from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the UserLeaveRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-leave-request',
  templateUrl: 'user-leave-request.html',
})
export class UserLeaveRequestPage {
  data = { employeeId: "", to: "", from: "", desc: "",status:""};

  registerForm: FormGroup;


  constructor(public navCtrl: NavController,public restProvider : RestProvider, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public formBuilder : FormBuilder) {
    this.data.employeeId = this.navParams.get("id");
    this.registerForm = formBuilder.group({
      employeeId:['',Validators.compose([Validators.required])],
      to : ['',Validators.compose([Validators.required])],
      from:['',Validators.compose([Validators.required])],
      desc:['',Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLeaveRequestPage');
  }

  applyLeave(){
    console.log("UserLeave Request applyLeave called");
    console.log(this.data);
    this.data.status = "pending";
     this.restProvider.applyLeave(this.data).then(res =>{      
      console.log(res);
      let toast = this.toastCtrl.create({
        message: 'Leave requested successfully',
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

}
