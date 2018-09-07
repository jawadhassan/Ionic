import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User{
  name:String;
  email:String;

  constructor(name:String,email:String){
    this.name = name;
    this.email = email;
  }
}
@Injectable()
export class AuthServiceProvider {

  currentUser : User;



  public login(credentials){
    if(credentials.email == null || credentials.password == null){
      return Observable.throw("Please insert credentials");
    }else{
      return Observable.create(observer=>{
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Admin','admin@Sapphire');
        observer.next(access);
        observer.complete();
      });
    }
  }

  
public getUserInfo() : User{
 return this.currentUser; 
}

public logOut(){
  return Observable.create(observer =>{
    this.currentUser = null;
    observer.next(true);
    observer.complete();
  });
}
}

