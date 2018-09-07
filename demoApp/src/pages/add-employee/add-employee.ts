import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the AddEmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-employee',
  templateUrl: 'add-employee.html',
})
export class AddEmployeePage {

  data = {name:"",lastname:"",contact:"",designation:""};

  registerForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite,
    private toast: Toast,
    public formBuilder : FormBuilder ) {
      this.registerForm = formBuilder.group({
        name:['',Validators.compose([Validators.required])],
        lastname : ['',Validators.compose([Validators.required])],
        contact:['',Validators.compose([Validators.required])],
        designation:['',Validators.compose([Validators.required])]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEmployeePage');
  }

  saveEmployee(){
    if(this.registerForm.valid){
      this.sqlite.create({
        name:'check.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql('INSERT INTO EMPLOYEES(id,name,lastname,contact,designation) VALUES (NULL,?,?,?,?)',[this.data.name,this.data.lastname,this.data.contact,this.data.designation])
        .then(res=>{
          this.toast.show('Employee Registered','4000','center').subscribe(
            toast=>{
            this.navCtrl.popToRoot();
          });
        })
        .catch(e=>{
          this.toast.show("Employee already exists",'4000','center').subscribe(
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
        );
      });
    }
 
  }

}
