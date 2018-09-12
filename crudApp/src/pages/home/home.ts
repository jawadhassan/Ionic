import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import {AddDataPage} from '../add-data/add-data';
import {EditDataPage} from '../edit-data/edit-data';
import {Injectable} from '@angular/core';
import {Toast} from '@ionic-native/toast';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts : any[] =[];

  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    private toast: Toast

  ){
  }

  ionViewDidLoad(){
    this.getData();
  }

  ionViewWillEnter(){
    this.getData();
  }
  
  getData(){
    this.sqlite.create({
      name : 'check.db',
      location: 'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, number TEXT,  email TEXT, address TEXT, CONSTRAINT _unique UNIQUE(number), CONSTRAINT email_unique UNIQUE(email))',<any>{})
      .then(res=> console.log('Check Executed SQL'))
      .catch(e=>{
        console.log(e);
        this.toast.show("Create:"+e.message,'5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
      db.executeSql('Select * FROM Contacts ORDER BY id DESC',<any>{})
      .then(res=>{
        this.contacts = [];
        for(var i =0; i< res.rows.length;i++){
          this.contacts.push({id:res.rows.item(i).id,name:res.rows.item(i).name,number : res.rows.item(i).number, email : res.rows.item(i).email,address : res.rows.item(i).address});
        }
      })
    })
  }

  addData(){
    this.navCtrl.push(AddDataPage);
  }

  editData(id){
    this.navCtrl.push(EditDataPage,{
      id:id
    });
  }

  deleteData(id){
    this.sqlite.create({
      name : 'check.db',
      location : 'default'
    }).then((db : SQLiteObject) => {
      db.executeSql('DELETE FROM Contacts WHERE id=?',[id])
      .then(res =>{
        console.log(res);
        this.getData();
      })
      .catch(e=> console.log(e));
    }).catch(e=> console.log(e));
    
  }

}
