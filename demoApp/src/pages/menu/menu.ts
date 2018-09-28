import { Component, ViewChild } from '@angular/core';
import { Nav} from 'ionic-angular';
import { IonicPage, NavController, NavParams,MenuController,LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: any;
  id:String;
  loading: Loading;
  userprofile:String;
  usermail:String;
  username:String;
  //rootPage:any;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string, page:any}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private auth: AuthServiceProvider,public menu: MenuController,private loadingCtrl: LoadingController) {
    this.id = this.navParams.get("id");
    console.log("Menu Page"+this.id)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
   
    if(this.auth.getUserInfo().privilege==='admin'){
      console.log("Check");
      this.userprofile = this.auth.getUserAvatar();
      this.username = this.auth.getUserInfo().name;
      this.usermail = this.auth.getUserInfo().usermail;
      this.pages = [
        {title:'Add Employee',page:'AddEmployeePage'},
        {title:'Leave Requests',page:'LeaveRequestPage'}
      ];  

      this.openPage(HomePage);
    
    }else{
      this.pages = [
        {title:'Add Leave Requests',page:'UserLeaveRequestPage'}
      ];

      this.openPage('UserHomePage');

    }
  }

  
  ionViewWillEnter() {

  

}

ionViewCanEnter() {
  return this.auth.isLoggedIn();
}

logout(){ 
  this.auth.logOut().subscribe(logout => {
    if (logout) {  
    this.menu.enable(false);
    this.showLoading();
    this.nav.setRoot('LoginPage');
    }
  });
}

showLoading() {
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    dismissOnPageChange: true
  });
  this.loading.present();
}

openPage(page){
  console.log('openPage called');
  this.menu.close();
  this.nav.push(page,{
    id:this.id
  });
  
}

}
