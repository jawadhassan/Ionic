import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  //rootPage:any;



  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // set a key/value
  

     // this.checkPreviousAuthorization();
    });
    //console.log("Check"+auth.isAdmin)


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
}
