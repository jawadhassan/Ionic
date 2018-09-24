import { HttpClient,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import {RequestOptions, Http} from '@angular/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  

  //apiUrl = 'http://192.168.1.100:8080/restmessenger/webapi/myresource';
  apiUrl = 'http://192.168.1.119:8080/restmessenger/webapi/myresource'
  constructor(public http:HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getEmployees(){
    
    return new Promise(resolve =>{
      this.http.get(this.apiUrl+'/employees').subscribe(data =>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    });
  }

  editEmployee(data){

   
  /*   var headers = new HttpHeaders();
 
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    
    var employeedata = JSON.stringify({ contact:employee.contact,designation:employee.designation,
    id:employee.id,lastname:employee.lastname,name:employee.name});
  //  var jsonstring = JSON.stringify(data);
  
    return new Promise((resolve, reject) => {
      //
        this.http.post(this.apiUrl+'/edit',employeedata ,{headers:headers}).subscribe(
        data => {
          console.log("check"+data);
        },
        error => {
          console.log(error);
      });

    }); */

    var employee = data;

    var employeedata = JSON.stringify({ contact:employee.contact,designation:employee.designation,
      id:employee.id,lastname:employee.lastname,name:employee.name});
  
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/edit',employeedata, config)
      .subscribe(
        data => {
          resolve(data);
          console.log("check"+data);
        },
        error => {
         
          console.log(error);
      });

    });

  } 

  saveEmployee(data){
    var newemployee = data;
    var newEmployeeData = JSON.stringify({ contact:newemployee.contact,designation:newemployee.designation,
      id:newemployee.id,lastname:newemployee.lastname,name:newemployee.name});
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
     
      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl+'/add',newEmployeeData, config)
        .subscribe(
          data => {
            resolve(data);
            console.log("check"+data);
          },
          error => {
            console.log(error);
        });
  
      });
  }


  delete(id){
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'/'+id+'/delete', config)
    .subscribe(
      data => {
        resolve(data);
        console.log("check delete"+data);
      },
      error => {
        console.log(error);
    });

  });
} 


getLeaves(){
    
  return new Promise(resolve =>{
    this.http.get(this.apiUrl+'/leaves').subscribe(data =>{
      resolve(data);
    }, err=>{
      console.log(err);
    });
  });
}

getEmployee(id){
  return new Promise(resolve =>{
    this.http.get(this.apiUrl+"/"+id+"/get").subscribe(data=>{
      console.log(data);
      resolve(data);
    }, err=>{
      console.log(err);
    })
  });
}


leaveApproval(id,status){
  return new Promise((resolve,reject) =>{
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    this.http.post(this.apiUrl+"/"+id+"/"+status+"/leaveApproval",config).subscribe(data=>{
      console.log(data);
      resolve(data);
    },err=>{
      console.log(err);
    })
  })
}
  
}
