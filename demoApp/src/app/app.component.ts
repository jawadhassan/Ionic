import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  //rootPage:any;

  @ViewChild(Nav) nav: Nav;
  pages: Array<{title:string, component:any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // set a key/value
  

     // this.checkPreviousAuthorization();
    });

    this.pages = [
      {title:'Add Employee',component:'AddEmployeePage'},
      {title:'Leave Requests',component:'LeaveRequestPage'}
    ];
  }

  openPage(page){
    console.log('openPage called')
    this.nav.push(page.component);
  }

 /*   checkPreviousAuthorization(): void { 

    var username;
    var password;
    this.storage.get('username').then((val) => {
      console.log('Username is', val);
      username = val;
    });

    this.storage.get('password').then((val) => {
      console.log('Password is', val);
      password = val;
    });

    if((username === null) && (password === null)) {
      this.rootPage = 'LoginPage';
    } else {
      this.rootPage = HomePage;
    } 
}  */
}

