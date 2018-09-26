import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {RestProvider} from '../../providers/rest/rest';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  registerCredentials = { email:"", password:""};

  loading: Loading;

  registerForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public restProvider : RestProvider) {

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],

    });

 
    
  }


  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
       // this.auth.getUserInfo().privilege ='user';
        if(this.auth.getUserInfo().privilege==='admin'){
          console.log('User Privilege'+this.auth.getUserInfo().privilege);
          this.navCtrl.setRoot(HomePage);
        }else{
          this.navCtrl.setRoot('UserHomePage');
        }
        
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewDidLoad() {

   
    console.log('ionViewDidLoad LoginPage');
    
}
   

    
  }

 


 




