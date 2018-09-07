import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import { EmployeeDetailPage } from '../employee-detail/employee-detail';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  employees : any[] = [];

  /* email:String = '';
  user:String = ''; */
  constructor(public navCtrl: NavController,private auth: AuthServiceProvider,  private sqlite: SQLite,
    private toast: Toast ) {
  
    
    /*let info = this.auth.getUserInfo(); 
    this.email = info['email'];
    this.user = info['name']; */
  }

  ionViewDidLoad(){
    this.getData();
  }

  ionViewWillEnter(){
    this.getData();
  }

  getData(){
    this.sqlite.create({
      name:'check.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS EMPLOYEES(id INTEGER PRIMARY KEY AUTOINCREMENT ,name TEXT, lastname TEXT, contact TEXT,designation TEXT, CONSTRAINT _unique UNIQUE(contact))',<any>{})
      .then(res=> console.log('Check Executed SQL'))
      .catch(e=>{
        this.toast.show("Create"+e.message,'5000','center')
        .subscribe(
          toast=>{
            console.log(toast);
          }
        );
      });
      db.executeSql('Select * FROM EMPLOYEES ORDER BY id DESC',<any>{})
        .then(res=>{
          this.employees = [];
          for(var i=0; i<res.rows.length;i++){
            this.employees.push({id:res.rows.item(i).id,name:res.rows.item(i).name,lastname:res.rows.item(i).lastname,contact:res.rows.item(i).contact,designation:res.rows.item(i).designation});
          }
        })
    })
  }

  viewDetail(employee){
    this.navCtrl.push('EmployeeDetailPage',{
      employee:employee
    });
  }

  addData(){
    this.navCtrl.push('AddEmployeePage');
  }

  public logout(){
    this.auth.logOut().subscribe(succ =>{
      this.navCtrl.setRoot('LoginPage')
    })
  }

}
