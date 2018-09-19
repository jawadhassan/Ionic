import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the EmployeeDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee-detail',
  templateUrl: 'employee-detail.html',
})
export class EmployeeDetailPage {

  name;
  lastname;
  contact;
  designation;
  id;
  employee;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    this.employee = this.navParams.get('employee');
    this.id = this.navParams.get('employee').id;
    this.name = this.navParams.get('employee').name;
    this.lastname = this.navParams.get('employee').lastname;
    this.contact = this.navParams.get('employee').contact;
    this.designation = this.navParams.get('employee').designation;
   // this.getCurrentData(this.id);
    console.log('ionViewDidLoad EmployeeDetailPage');
  }

  
  editData(employee){
    this.navCtrl.push('EditEmployeePage',{
      employee:employee
    });
  } 


  delete(id) {

    this.restProvider.delete(id).then(res => {
      console.log("Check Delete"+res);
      let toast = this.toastCtrl.create({
        message: 'User was deleted successfully',
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


  /* editData(id){
    this.navCtrl.push('EditEmployeePage',{
      id:id
    });
  } */


  /* getCurrentData(id){
    this.sqlite.create({
      name:'check.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      console.log('getcurrentcalled');
      db.executeSql('SELECT id,name,lastname,contact,designation FROM EMPLOYEES WHERE id=?',[id])
      .then(res=>{
        if(res.rows.length> 0){
          this.id = res.rows.item(0).id;
          this.name = res.rows.item(0).name;
          this.lastname = res.rows.item(0).lastname;
          this.contact = res.rows.item(0).contact;
          this.designation = res.rows.item(0).designation;
        }
      })
      .catch(e=>{
        console.log(e);
      });
    }).catch(e=>{
      console.log(e);
      this.toast.show('Error!','5000','center')
      .subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
  */
 /*  ionViewWillEnter(){
    this.getCurrentData(this.id);
  } */
  

}
