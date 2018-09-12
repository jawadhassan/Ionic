import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';

/**
 * Generated class for the EditEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-employee',
  templateUrl: 'edit-employee.html',
})
export class EditEmployeePage {

  data = {id:0,name:"",lastname:"",contact:"",designation:""};
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite,
    private toast: Toast) {
    this.getCurrentData(navParams.get("id"));
  }

  getCurrentData(id){
    this.sqlite.create({
      name:'check.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('SELECT id,name,lastname,contact,designation FROM EMPLOYEES WHERE id=?',[id])
      .then(res=>{
        console.log("in edit employee current data")
        if(res.rows.length> 0){
          this.data.id = res.rows.item(0).id;
          this.data.name = res.rows.item(0).name;
          this.data.lastname = res.rows.item(0).lastname;
          this.data.contact = res.rows.item(0).contact;
          this.data.designation = res.rows.item(0).designation;
        }
      })
      .catch(e=>{
        console.log(e);
        this.toast.show("Error Failed to view Employee",'5000','center')
        .subscribe(
          toast => {
            console.log(toast);
          }
        );
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

  updateData(){
    this.sqlite.create({
      name:'check.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('UPDATE EMPLOYEES SET name=?,lastname=?,contact=?,designation=? WHERE id=?',[this.data.name,this.data.lastname,this.data.contact,this.data.designation,this.data.id])
      .then(res=>{
        console.log(res);
        this.toast.show('Employee Updated!','4000','center')
        .subscribe(
           toast=>{
              console.log(res);
           }
        );
        this.navCtrl.pop();
      })
      .catch(e=>{
        this.toast.show("Error in updating",'5000','center')
        .subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }).catch(e=>{
      this.toast.show("Error!",'5000','center').subscribe(
        toast=> {
          console.log(toast);
        }
      )
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEmployeePage');
  }

}
