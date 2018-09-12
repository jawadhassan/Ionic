import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
/**
 * Generated class for the EditDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  data = {id:0,name:"",number:"",email:"",address:""};

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private sqlite:SQLite,
  private toast:Toast) {
    this.getCurrentData(navParams.get("id"));
  }

  getCurrentData(id){
    this.sqlite.create({
      name:'check.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('SELECT id,name,number,email,address From Contacts WHERE id=?',[id])
      .then(res => {
        if(res.rows.length > 0){
          this.data.id = res.rows.item(0).id;
          this.data.name = res.rows.item(0).name;
          this.data.number = res.rows.item(0).number;
          this.data.email = res.rows.item(0).email;
          this.data.address = res.rows.item(0).address;
        }
      })
      .catch(e=>{
        console.log(e);
        this.toast.show("Error Failed to view contacts",'5000','center')
        .subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }).catch(e=>{
      console.log(e);
      this.toast.show("Error!",'5000','center')
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
      location: 'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('UPDATE Contacts SET name=?,number=?,email=?,address=? WHERE id=?',[this.data.name,this.data.number,this.data.email,this.data.address,this.data.id])
      .then(res =>{
        console.log(res);
        this.toast.show('Contact Updated!','4000','center')
        .subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      })
      .catch(e=>{
        console.log(e);
        this.toast.show("Error in updating",'5000','center')
        .subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }).catch(e=>{
      console.log(e);
      this.toast.show("Error!",'5000','center').subscribe(
        toast => {
          console.log(toast);
        }
      )
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

}
