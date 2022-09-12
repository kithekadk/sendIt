import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {data} from '../../interfaces/interfaces'
import { loadRole, loginUser } from '../../ngrx/Actions/userActions';
import { getToken, userState } from '../../ngrx/Reducer/userReducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login = true
filled = false
error = 'Logged In successfully'
close(){
  this.login=true
}
  constructor(private router:Router, private store:Store<userState>) { }


input={email: '', password: ''}

  ngOnInit(): void {
  }
  onLogin(input:data){

      this.store.select(getToken).subscribe(res=>{
      let token=res
      localStorage.setItem("token", token)
      this.checkRole()
      return token
    })
    if(input.email !=='' && input.password !==''){
      this.store.dispatch(loginUser({logins:{...input}}))
        this.login = false
        this.filled = true
        
        setTimeout(() => {
          
          this.redirect() 
          
        }, 1500);
        }
    else{
      this.filled = false
    }
  
  }

  checkRole(){
    this.store.dispatch(loadRole())
  }
  redirect(){
    let role = localStorage.getItem('role')
    if ( role == 'user'){
      this.login = false
      this.filled = true
      this.router.navigate(['/user/received']);

      localStorage.setItem('isLoggedIn', 'true')

    }else if(role == 'admin'){

      this.router.navigate(['/admin/parcels']);

      localStorage.setItem('isLoggedIn', 'true')
    }
  }
}
