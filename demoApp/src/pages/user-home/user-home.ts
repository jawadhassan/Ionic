import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';

/**
 * Generated class for the UserHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {

  leaves:any;
  id:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider : RestProvider) {
    this.id = this.navParams.get("id");
    console.log("Check User Leave ID"+this.id);
    this.doRefresh(0);
  }



  ionViewDidLoad(){
    //this.getData();
    this.getLeaves(this.id);
  }

  ionViewWillEnter(){
    // this.getData();
    this.getLeaves(this.id);
   }

  getLeaves(id){
    this.restProvider.getAppliedLeaves(id).then(data =>{
        this.leaves = data;
        console.log(this.leaves);
    }) 
  }


  viewDetail(leave){
    this.navCtrl.push('LeaveRequestStatusPage',{
     leave:leave
   });
 }

  doRefresh(refresher){
    this.restProvider.getAppliedLeaves(this.id).then(data =>{
      this.leaves = data;
    })   
  }

}
