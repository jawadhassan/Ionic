import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the AddDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {
  

  data = {number:"",name:"", email:"",address:""};

  registerForm : FormGroup;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toast : Toast,
    private sqlite: SQLite,
    public formBuilder : FormBuilder
  ) {
    this.registerForm = formBuilder.group({
      name:['',Validators.compose([Validators.required])],
      number : ['',Validators.compose([Validators.required])],
      email:['',Validators.compose([Validators.required,Validators.pattern('^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),Validators.minLength(1)])],
      address:['',Validators.compose([Validators.required])]
    });
  }

  saveData(){
    if(this.registerForm.valid){
      this.sqlite.create({
        name:'check.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql('INSERT INTO Contacts(id,name,number,email,address) VALUES (NULL,?,?,?,?)',[this.data.name,this.data.number,this.data.email,this.data.address])
          .then(res=>{
            console.log(res);
            this.toast.show('Contact Registered','4000','center').subscribe(toast=>{
              this.navCtrl.popToRoot();
            });
          })
          .catch(e=> {
            console.log(e.message);
            this.toast.show("Name or number already exists",'4000','center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });
      }).catch(e=> {
        console.log(e);
        this.toast.show("Error!",'5000','center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
    }
  }

/*   ionViewDidLoad() {
    console.log('ionViewDidLoad AddDataPage');
  } */

}
