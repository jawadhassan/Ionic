import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {RestProvider} from '../../providers/rest/rest';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class User{
  name:String;
  usermail:String;
  privilege:String;
  id:String;

  constructor(name:String,usermail:String,privilege:String,id:String){
    this.name = name;
    this.usermail = usermail;
    this.privilege= privilege;
    this.id=id;
  }
}
@Injectable()
export class AuthServiceProvider {

  currentUser : User;
  employee:any;

  constructor(public restProvider: RestProvider) {
  }

  public login(credentials){
    if(credentials.email == null || credentials.password == null){
      return Observable.throw("Please insert credentials");
    }else{
      return Observable.create(observer=>{
        this.restProvider.authenticate(credentials.email,credentials.password).then(data =>{
          this.employee = data;
        //  console.log("Check Admin"+this.employee.name); 
        //  let access = (credentials.password === "pass" && credentials.email === "man@abc.com");
        
        let access = (credentials.password === this.employee.password && credentials.email === this.employee.usermail);
        //  this.currentUser = new User('Martin','admin@Sapphire','admin');
        if(access){
          this.currentUser = new User(this.employee.name,this.employee.usermail,this.employee.privilege,this.employee.id);
          console.log(this.currentUser);  
        }
        
          observer.next(access);
          observer.complete();
        
        }).catch(error=>{
          console.log(error);
          observer.next(false);
          observer.complete();
        });

      
      });
    }
  }

  
public getUserInfo() : User{
 return this.currentUser; 
}

public getUserAvatar(): String{
  return this.employee.avatar;
}

isLoggedIn() {
  return this.currentUser != null;
}


public logOut(){
  console.log('Logout auth called');
  return Observable.create(observer =>{
    this.currentUser = null;
    observer.next(true);
    observer.complete();
  });
}
}

